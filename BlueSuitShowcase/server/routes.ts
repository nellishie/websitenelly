import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./utils/replitmail";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { requireAdmin } from "./middleware/auth";
import { insertExperienceSchema, insertSkillSchema } from "@shared/schema";

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required")
});

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many contact submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint with rate limiting
  app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
      // Validate request body
      const { name, email, subject, message } = contactSchema.parse(req.body);
      
      // Send email to nellishie32@gmail.com
      await sendEmail({
        to: 'nellishie32@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `New message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from your portfolio contact form.`,
        html: `
          <h2>New message from your portfolio website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr>
          <p><em>This message was sent from your portfolio contact form.</em></p>
        `
      });

      res.json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        });
      } else if (error instanceof Error && error.message.includes('Email service is not available')) {
        res.status(503).json({ 
          success: false, 
          message: 'Email service is temporarily unavailable. Please try again later or contact directly via email.' 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to send email. Please try again or contact directly.' 
        });
      }
    }
  });

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
