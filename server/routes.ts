import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  loginSchema, 
  registerSchema,
  insertEvaluationSchema,
  insertFeedbackSchema,
  insertProgressSchema
} from "@shared/schema";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Setup session
  const MemoryStoreSession = MemoryStore(session);
  
  app.use(
    session({
      secret: "knowledge-flow-secret-key",
      resave: false,
      saveUninitialized: false,
      store: new MemoryStoreSession({
        checkPeriod: 86400000 // 24 hours
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }
    })
  );
  
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          return done(null, false, { message: "Incorrect username or password." });
        }
        
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect username or password." });
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  
  // Serialize and deserialize user
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };
  
  // Auth routes
  app.post("/api/auth/login", (req, res, next) => {
    try {
      const result = loginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.format() });
      }
      
      passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        
        if (!user) {
          return res.status(401).json({ message: info.message });
        }
        
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          
          const { password, ...userWithoutPassword } = user;
          return res.json({ user: userWithoutPassword });
        });
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const result = registerSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.format() });
      }
      
      const { username, email } = result.data;
      
      // Check if user with same username exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(result.data);
      
      // Automatically log in the new user
      req.logIn(newUser, (err) => {
        if (err) {
          return next(err);
        }
        
        const { password, ...userWithoutPassword } = newUser;
        return res.status(201).json({ user: userWithoutPassword });
      });
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/current", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const { password, ...userWithoutPassword } = req.user as any;
    res.json({ user: userWithoutPassword });
  });
  
  // Course routes
  app.get("/api/courses", async (_, res, next) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/courses/featured", async (_, res, next) => {
    try {
      const featuredCourses = await storage.getFeaturedCourses();
      res.json(featuredCourses);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/courses/:id", async (req, res, next) => {
    try {
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      
      const course = await storage.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/courses/category/:category", async (req, res, next) => {
    try {
      const courses = await storage.getCoursesByCategory(req.params.category);
      res.json(courses);
    } catch (error) {
      next(error);
    }
  });

  // Module routes
  app.get("/api/modules", async (_, res, next) => {
    try {
      const modules = await storage.getModules();
      res.json(modules);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/modules/course/:courseId", async (req, res, next) => {
    try {
      const courseId = parseInt(req.params.courseId);
      if (isNaN(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
      
      const modules = await storage.getModulesByCourse(courseId);
      res.json(modules);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/modules/:slug", async (req, res, next) => {
    try {
      const module = await storage.getModuleBySlug(req.params.slug);
      
      if (!module) {
        return res.status(404).json({ message: "Module not found" });
      }
      
      res.json(module);
    } catch (error) {
      next(error);
    }
  });
  
  // Progress routes
  app.get("/api/progress", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      const progress = await storage.getProgressByUser(user.id);
      res.json(progress);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/progress", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      const result = insertProgressSchema.safeParse({
        ...req.body,
        userId: user.id
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.format() });
      }
      
      const progress = await storage.updateProgress(
        user.id,
        result.data.moduleId,
        result.data.percentComplete || 0,
        result.data.completed || false
      );
      
      res.json(progress);
    } catch (error) {
      next(error);
    }
  });
  
  // Evaluation routes
  app.get("/api/evaluation", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      const evaluation = await storage.getEvaluationByUser(user.id);
      
      if (!evaluation) {
        return res.status(404).json({ message: "No evaluation found" });
      }
      
      res.json(evaluation);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/evaluation", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      const result = insertEvaluationSchema.safeParse({
        ...req.body,
        userId: user.id
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.format() });
      }
      
      const evaluation = await storage.saveEvaluation(result.data);
      res.json(evaluation);
    } catch (error) {
      next(error);
    }
  });
  
  // Feedback routes
  app.post("/api/feedback", isAuthenticated, async (req, res, next) => {
    try {
      const user = req.user as any;
      
      const result = insertFeedbackSchema.safeParse({
        ...req.body,
        userId: user.id
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.format() });
      }
      
      const feedback = await storage.saveFeedback(result.data);
      res.json(feedback);
    } catch (error) {
      next(error);
    }
  });

  return httpServer;
}
