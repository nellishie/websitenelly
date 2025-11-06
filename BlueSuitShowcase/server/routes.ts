import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { requireAdmin } from "./middleware/auth";
import { insertExperienceSchema, insertSkillSchema, insertAchievementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {

  // Public endpoints for fetching experiences and skills
  app.get('/api/experiences', async (req, res) => {
    try {
      const experiences = await storage.getExperiences();
      res.json(experiences);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      res.status(500).json({ error: 'Failed to fetch experiences' });
    }
  });

  app.get('/api/skills', async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  // Admin endpoints for managing experiences
  app.post('/api/admin/experiences', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(validatedData);
      res.json(experience);
    } catch (error) {
      console.error('Error creating experience:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create experience' });
      }
    }
  });

  app.put('/api/admin/experiences/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(id, validatedData);
      
      if (!experience) {
        return res.status(404).json({ error: 'Experience not found' });
      }
      
      res.json(experience);
    } catch (error) {
      console.error('Error updating experience:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to update experience' });
      }
    }
  });

  app.delete('/api/admin/experiences/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteExperience(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting experience:', error);
      res.status(500).json({ error: 'Failed to delete experience' });
    }
  });

  // Admin endpoints for managing skills
  app.post('/api/admin/skills', requireAdmin, async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.json(skill);
    } catch (error) {
      console.error('Error creating skill:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create skill' });
      }
    }
  });

  app.put('/api/admin/skills/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, validatedData);
      
      if (!skill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      
      res.json(skill);
    } catch (error) {
      console.error('Error updating skill:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to update skill' });
      }
    }
  });

  app.delete('/api/admin/skills/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSkill(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting skill:', error);
      res.status(500).json({ error: 'Failed to delete skill' });
    }
  });

  // Public endpoints for CV
  app.get('/api/cv/active', async (req, res) => {
    try {
      const activeCv = await storage.getActiveCv();
      if (!activeCv) {
        return res.status(404).json({ error: 'No CV available' });
      }
      res.json({ filename: activeCv.originalName });
    } catch (error) {
      console.error('Error fetching active CV:', error);
      res.status(500).json({ error: 'Failed to fetch CV' });
    }
  });

  app.get('/api/cv/download', async (req, res) => {
    try {
      const activeCv = await storage.getActiveCv();
      if (!activeCv) {
        return res.status(404).json({ error: 'No CV available' });
      }

      const buffer = Buffer.from(activeCv.fileData, 'base64');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${activeCv.originalName}"`);
      res.send(buffer);
    } catch (error) {
      console.error('Error downloading CV:', error);
      res.status(500).json({ error: 'Failed to download CV' });
    }
  });

  // Admin endpoints for managing CVs
  app.get('/api/admin/cv', requireAdmin, async (req, res) => {
    try {
      const cvFiles = await storage.getCvFiles();
      res.json(cvFiles);
    } catch (error) {
      console.error('Error fetching CV files:', error);
      res.status(500).json({ error: 'Failed to fetch CV files' });
    }
  });

  app.post('/api/admin/cv', requireAdmin, async (req, res) => {
    try {
      const { filename, originalName, fileData } = req.body;
      
      if (!filename || !originalName || !fileData) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const cvFile = await storage.createCvFile({
        filename,
        originalName,
        fileData,
        isActive: false
      });

      res.json(cvFile);
    } catch (error) {
      console.error('Error uploading CV:', error);
      res.status(500).json({ error: 'Failed to upload CV' });
    }
  });

  app.put('/api/admin/cv/:id/activate', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.setActiveCv(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error activating CV:', error);
      res.status(500).json({ error: 'Failed to activate CV' });
    }
  });

  app.delete('/api/admin/cv/:id', requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteCvFile(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting CV:', error);
      res.status(500).json({ error: 'Failed to delete CV' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
