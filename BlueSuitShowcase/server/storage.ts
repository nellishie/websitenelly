import { 
  type User, 
  type InsertUser,
  type Experience,
  type InsertExperience,
  type Skill,
  type InsertSkill,
  users,
  experiences,
  skills
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq, asc } from "drizzle-orm";

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
}

export const storage = new DbStorage();
