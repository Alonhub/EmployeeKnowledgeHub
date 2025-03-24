import { 
  users, 
  type User, 
  type InsertUser,
  courses,
  type Course,
  type InsertCourse,
  modules,
  type Module,
  type InsertModule,
  progress,
  type Progress,
  type InsertProgress,
  evaluations,
  type Evaluation,
  type InsertEvaluation,
  feedback,
  type Feedback,
  type InsertFeedback
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourseById(id: number): Promise<Course | undefined>;
  getCourseBySlug(slug: string): Promise<Course | undefined>;
  getFeaturedCourses(): Promise<Course[]>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Modules methods
  getModules(): Promise<Module[]>;
  getModuleBySlug(slug: string): Promise<Module | undefined>;
  getModulesByCourse(courseId: number): Promise<Module[]>;
  createModule(module: InsertModule): Promise<Module>;
  
  // Progress methods
  getProgressByUser(userId: number): Promise<Progress[]>;
  getModuleProgress(userId: number, moduleId: number): Promise<Progress | undefined>;
  updateProgress(userId: number, moduleId: number, percentComplete: number, completed?: boolean): Promise<Progress>;
  
  // Evaluation methods
  getEvaluationByUser(userId: number): Promise<Evaluation | undefined>;
  saveEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  
  // Feedback methods
  saveFeedback(feedback: InsertFeedback): Promise<Feedback>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private modules: Map<number, Module>;
  private progressRecords: Map<string, Progress>;
  private evaluations: Map<number, Evaluation>;
  private feedbacks: Map<number, Feedback>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.modules = new Map();
    this.progressRecords = new Map();
    this.evaluations = new Map();
    this.feedbacks = new Map();
    this.currentId = {
      users: 1,
      courses: 1,
      modules: 1, 
      progress: 1,
      evaluations: 1,
      feedback: 1
    };
    
    // Initialize with default courses and modules
    this.initCourses();
    this.initModules();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { 
      ...insertUser, 
      id,
      fullName: insertUser.fullName || null,
      company: insertUser.company || null
    };
    this.users.set(id, user);
    return user;
  }
  
  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourseById(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    return Array.from(this.courses.values()).find(course => course.slug === slug);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.featured);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.category === category);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const id = this.currentId.courses++;
    const newCourse: Course = { 
      ...course, 
      id, 
      imageUrl: course.imageUrl || null,
      category: course.category || null,
      level: course.level || null,
      duration: course.duration || null,
      featured: course.featured || null,
      createdAt: new Date()
    };
    this.courses.set(id, newCourse);
    return newCourse;
  }

  // Module methods
  async getModules(): Promise<Module[]> {
    return Array.from(this.modules.values()).sort((a, b) => a.order - b.order);
  }
  
  async getModuleBySlug(slug: string): Promise<Module | undefined> {
    return Array.from(this.modules.values()).find(module => module.slug === slug);
  }

  async getModulesByCourse(courseId: number): Promise<Module[]> {
    return Array.from(this.modules.values())
      .filter(module => module.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  }

  async createModule(module: InsertModule): Promise<Module> {
    const id = this.currentId.modules++;
    const newModule: Module = { 
      ...module, 
      id,
      description: module.description || null
    };
    this.modules.set(id, newModule);
    return newModule;
  }
  
  // Progress methods
  async getProgressByUser(userId: number): Promise<Progress[]> {
    return Array.from(this.progressRecords.values()).filter(
      record => record.userId === userId
    );
  }
  
  async getModuleProgress(userId: number, moduleId: number): Promise<Progress | undefined> {
    const key = `${userId}-${moduleId}`;
    return this.progressRecords.get(key);
  }
  
  async updateProgress(userId: number, moduleId: number, percentComplete: number, completed: boolean = false): Promise<Progress> {
    const key = `${userId}-${moduleId}`;
    const existingProgress = this.progressRecords.get(key);
    
    if (existingProgress) {
      const updatedProgress: Progress = {
        ...existingProgress,
        percentComplete,
        completed: completed || percentComplete === 100,
        updatedAt: new Date()
      };
      this.progressRecords.set(key, updatedProgress);
      return updatedProgress;
    }
    
    const newProgress: Progress = {
      id: this.currentId.progress++,
      userId,
      moduleId,
      percentComplete,
      completed: completed || percentComplete === 100,
      updatedAt: new Date()
    };
    
    this.progressRecords.set(key, newProgress);
    return newProgress;
  }
  
  // Evaluation methods
  async getEvaluationByUser(userId: number): Promise<Evaluation | undefined> {
    return Array.from(this.evaluations.values()).find(
      evaluation => evaluation.userId === userId
    );
  }
  
  async saveEvaluation(evaluation: InsertEvaluation): Promise<Evaluation> {
    const existingEvaluation = Array.from(this.evaluations.values()).find(
      e => e.userId === evaluation.userId
    );
    
    if (existingEvaluation) {
      const updatedEvaluation: Evaluation = {
        ...existingEvaluation,
        score: evaluation.score || null,
        totalQuestions: evaluation.totalQuestions || null,
        completed: evaluation.completed || null,
        updatedAt: new Date()
      };
      this.evaluations.set(existingEvaluation.id, updatedEvaluation);
      return updatedEvaluation;
    }
    
    const id = this.currentId.evaluations++;
    const newEvaluation: Evaluation = {
      id,
      userId: evaluation.userId,
      score: evaluation.score || null,
      totalQuestions: evaluation.totalQuestions || null,
      completed: evaluation.completed || null,
      updatedAt: new Date()
    };
    
    this.evaluations.set(id, newEvaluation);
    return newEvaluation;
  }
  
  // Feedback methods
  async saveFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentId.feedback++;
    const newFeedback: Feedback = {
      id,
      userId: insertFeedback.userId,
      rating: insertFeedback.rating || null,
      improvements: insertFeedback.improvements || null,
      feedbackText: insertFeedback.feedbackText || null,
      submittedAt: new Date()
    };
    
    this.feedbacks.set(id, newFeedback);
    return newFeedback;
  }
  
  // Initialize default courses
  private initCourses() {
    const defaultCourses: Course[] = [
      {
        id: 1,
        title: "Knowledge Management Fundamentals",
        slug: "km-fundamentals",
        description: "Learn the basics of knowledge management in organizational settings.",
        imageUrl: null,
        category: "Fundamentals",
        level: "Beginner",
        duration: "3 hours",
        featured: true,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Advanced Knowledge Management",
        slug: "advanced-km",
        description: "Dive deeper into knowledge management strategies and implementation.",
        imageUrl: null,
        category: "Advanced",
        level: "Intermediate",
        duration: "5 hours",
        featured: false,
        createdAt: new Date()
      },
      {
        id: 3,
        title: "Knowledge Management for Leaders",
        slug: "km-leadership",
        description: "Learn how to implement knowledge management practices as a leader.",
        imageUrl: null,
        category: "Leadership",
        level: "Advanced",
        duration: "4 hours",
        featured: true,
        createdAt: new Date()
      }
    ];
    
    defaultCourses.forEach(course => {
      this.courses.set(course.id, course);
    });
    
    this.currentId.courses = defaultCourses.length + 1;
  }
  
  // Initialize default modules
  private initModules() {
    const defaultModules: Module[] = [
      {
        id: 1,
        title: "Social Factors in Knowledge Management",
        slug: "social-factors",
        description: "Explore social factors that influence knowledge management behaviors in organizations.",
        courseId: 1,
        order: 1
      },
      {
        id: 2,
        title: "Cultural Factors in Knowledge Management",
        slug: "cultural-factors",
        description: "Learn about cultural dimensions that impact knowledge sharing and management.",
        courseId: 1,
        order: 2
      },
      {
        id: 3,
        title: "Knowledge Management Evaluation",
        slug: "evaluation",
        description: "Test your understanding of knowledge management concepts.",
        courseId: 1,
        order: 3
      },
      {
        id: 4,
        title: "Knowledge Sharing Mechanisms",
        slug: "knowledge-sharing",
        description: "Understand different mechanisms for knowledge sharing in organizations.",
        courseId: 2,
        order: 1
      },
      {
        id: 5,
        title: "Knowledge Capture Strategies",
        slug: "knowledge-capture",
        description: "Learn effective strategies for capturing organizational knowledge.",
        courseId: 2,
        order: 2
      },
      {
        id: 6,
        title: "Leadership in Knowledge Management",
        slug: "leadership-km",
        description: "Explore how leadership impacts knowledge management success.",
        courseId: 3,
        order: 1
      },
      {
        id: 7,
        title: "Building a Knowledge-Centric Culture",
        slug: "knowledge-culture",
        description: "Learn how to foster a culture that values knowledge sharing and learning.",
        courseId: 3,
        order: 2
      }
    ];
    
    defaultModules.forEach(module => {
      this.modules.set(module.id, module);
    });
    
    this.currentId.modules = defaultModules.length + 1;
  }
}

export const storage = new MemStorage();
