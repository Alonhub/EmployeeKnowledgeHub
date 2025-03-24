import { 
  users, 
  type User, 
  type InsertUser,
  modules,
  type Module,
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
  
  // Modules methods
  getModules(): Promise<Module[]>;
  getModuleBySlug(slug: string): Promise<Module | undefined>;
  
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
  private modules: Map<number, Module>;
  private progressRecords: Map<string, Progress>;
  private evaluations: Map<number, Evaluation>;
  private feedbacks: Map<number, Feedback>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.modules = new Map();
    this.progressRecords = new Map();
    this.evaluations = new Map();
    this.feedbacks = new Map();
    this.currentId = {
      users: 1,
      modules: 1, 
      progress: 1,
      evaluations: 1,
      feedback: 1
    };
    
    // Initialize with default modules
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Module methods
  async getModules(): Promise<Module[]> {
    return Array.from(this.modules.values()).sort((a, b) => a.order - b.order);
  }
  
  async getModuleBySlug(slug: string): Promise<Module | undefined> {
    return Array.from(this.modules.values()).find(module => module.slug === slug);
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
        ...evaluation,
        updatedAt: new Date()
      };
      this.evaluations.set(existingEvaluation.id, updatedEvaluation);
      return updatedEvaluation;
    }
    
    const id = this.currentId.evaluations++;
    const newEvaluation: Evaluation = {
      id,
      ...evaluation,
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
      ...insertFeedback,
      submittedAt: new Date()
    };
    
    this.feedbacks.set(id, newFeedback);
    return newFeedback;
  }
  
  // Initialize default modules
  private initModules() {
    const defaultModules: Module[] = [
      {
        id: 1,
        title: "Social Factors in Knowledge Management",
        slug: "social-factors",
        description: "Explore social factors that influence knowledge management behaviors in organizations.",
        order: 1
      },
      {
        id: 2,
        title: "Cultural Factors in Knowledge Management",
        slug: "cultural-factors",
        description: "Learn about cultural dimensions that impact knowledge sharing and management.",
        order: 2
      },
      {
        id: 3,
        title: "Knowledge Management Evaluation",
        slug: "evaluation",
        description: "Test your understanding of knowledge management concepts.",
        order: 3
      }
    ];
    
    defaultModules.forEach(module => {
      this.modules.set(module.id, module);
    });
    
    this.currentId.modules = defaultModules.length + 1;
  }
}

export const storage = new MemStorage();
