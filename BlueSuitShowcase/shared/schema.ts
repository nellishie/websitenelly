import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  period: text("period").notNull(),
  responsibilities: text("responsibilities").array().notNull(),
  order: integer("order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  bgColor: text("bg_color").notNull().default("bg-primary/10"),
  iconColor: text("icon_color").notNull().default("text-primary"),
  order: integer("order").notNull().default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
