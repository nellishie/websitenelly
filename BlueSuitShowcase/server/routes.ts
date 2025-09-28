import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./utils/replitmail";
import { z } from "zod";
import rateLimit from "express-rate-limit";

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

  const httpServer = createServer(app);

  return httpServer;
}
