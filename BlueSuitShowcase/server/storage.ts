import { 
  type User, 
  type InsertUser,
  type Experience,
  type InsertExperience,
  type Skill,
  type InsertSkill,
  type CvFile,
  type InsertCvFile,
  type Achievement,
  type InsertAchievement,
  users,
  experiences,
  skills,
  cvFiles,
  achievements
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { eq, asc, desc } from "drizzle-orm";
import ws from "ws";

class CustomWebSocket extends ws {
  constructor(address: string | URL, options?: any) {
    const wsOptions = {
      ...options,
      rejectUnauthorized: false
    };
    super(address, wsOptions);
  }
}

neonConfig.webSocketConstructor = CustomWebSocket as any;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool });

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getExperiences(): Promise<Experience[]>;
  getExperience(id: number): Promise<Experience | undefined>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<void>;
  
  getSkills(): Promise<Skill[]>;
  getSkill(id: number): Promise<Skill | undefined>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<void>;
  
  getCvFiles(): Promise<CvFile[]>;
  getActiveCv(): Promise<CvFile | undefined>;
  createCvFile(cvFile: InsertCvFile): Promise<CvFile>;
  setActiveCv(id: number): Promise<void>;
  deleteCvFile(id: number): Promise<void>;
  
  getAchievements(): Promise<Achievement[]>;
  getAchievement(id: number): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement | undefined>;
  deleteAchievement(id: number): Promise<void>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(asc(experiences.order));
  }

  async getExperience(id: number): Promise<Experience | undefined> {
    const result = await db.select().from(experiences).where(eq(experiences.id, id));
    return result[0];
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const result = await db.insert(experiences).values(experience).returning();
    return result[0];
  }

  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const result = await db.update(experiences).set(experience).where(eq(experiences.id, id)).returning();
    return result[0];
  }

  async deleteExperience(id: number): Promise<void> {
    await db.delete(experiences).where(eq(experiences.id, id));
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.order));
  }

  async getSkill(id: number): Promise<Skill | undefined> {
    const result = await db.select().from(skills).where(eq(skills.id, id));
    return result[0];
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const result = await db.insert(skills).values(skill).returning();
    return result[0];
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const result = await db.update(skills).set(skill).where(eq(skills.id, id)).returning();
    return result[0];
  }

  async deleteSkill(id: number): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }

  async getCvFiles(): Promise<CvFile[]> {
    return await db.select().from(cvFiles).orderBy(desc(cvFiles.uploadedAt));
  }

  async getActiveCv(): Promise<CvFile | undefined> {
    const result = await db.select().from(cvFiles).where(eq(cvFiles.isActive, true));
    return result[0];
  }

  async createCvFile(cvFile: InsertCvFile): Promise<CvFile> {
    const result = await db.insert(cvFiles).values(cvFile).returning();
    return result[0];
  }

  async setActiveCv(id: number): Promise<void> {
    await db.update(cvFiles).set({ isActive: false });
    await db.update(cvFiles).set({ isActive: true }).where(eq(cvFiles.id, id));
  }

  async deleteCvFile(id: number): Promise<void> {
    await db.delete(cvFiles).where(eq(cvFiles.id, id));
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).orderBy(asc(achievements.order));
  }

  async getAchievement(id: number): Promise<Achievement | undefined> {
    const result = await db.select().from(achievements).where(eq(achievements.id, id));
    return result[0];
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const result = await db.insert(achievements).values(achievement).returning();
    return result[0];
  }

  async updateAchievement(id: number, achievement: Partial<InsertAchievement>): Promise<Achievement | undefined> {
    const result = await db.update(achievements).set(achievement).where(eq(achievements.id, id)).returning();
    return result[0];
  }

  async deleteAchievement(id: number): Promise<void> {
    await db.delete(achievements).where(eq(achievements.id, id));
  }
}

export const storage = new DbStorage();
