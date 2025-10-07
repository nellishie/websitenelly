import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { storage } from "./storage";

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await seedDatabaseIfEmpty();
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();

async function seedDatabaseIfEmpty() {
  try {
    const experiences = await storage.getExperiences();
    const skills = await storage.getSkills();

    if (experiences.length === 0) {
      log('Seeding experiences...');
      const initialExperiences = [
        {
          title: "Graphic Designer",
          company: "Dico Interiors",
          location: "Harare, Zimbabwe",
          period: "Dec 2024 – Feb 2025",
          responsibilities: [
            "Produced high-quality product packaging designs",
            "Designed user interfaces for apps and websites",
            "Assisted video production with motion graphics",
            "Updated social media profiles with fresh graphics"
          ],
          order: 0
        },
        {
          title: "IT Technician",
          company: "Coverlink Holdings",
          location: "Harare, Zimbabwe",
          period: "Jun 2024 – Aug 2024",
          responsibilities: [
            "Managed IT backups and infrastructure plans",
            "Maintained systems and performed troubleshooting",
            "Kept IT asset records and ensured system security"
          ],
          order: 1
        },
        {
          title: "Web Developer",
          company: "ZCAS University",
          location: "Lusaka, Zambia",
          period: "Mar 2024 – Apr 2024",
          responsibilities: [
            "Developed a website \"Wina Bwangu\" for transactions"
          ],
          order: 2
        }
      ];

      for (const exp of initialExperiences) {
        await storage.createExperience(exp);
      }
      log('Experiences seeded successfully');
    }

    if (skills.length === 0) {
      log('Seeding skills...');
      const initialSkills = [
        {
          icon: "fab fa-python",
          title: "Python",
          category: "Programming",
          bgColor: "bg-primary/10",
          iconColor: "text-primary",
          order: 0
        },
        {
          icon: "fab fa-java",
          title: "Java",
          category: "OOP Programming",
          bgColor: "bg-secondary/10",
          iconColor: "text-secondary",
          order: 1
        },
        {
          icon: "fab fa-html5",
          title: "HTML5",
          category: "Web Development",
          bgColor: "bg-accent/10",
          iconColor: "text-accent",
          order: 2
        },
        {
          icon: "fab fa-css3-alt",
          title: "CSS3",
          category: "Styling & Layout",
          bgColor: "bg-primary/10",
          iconColor: "text-primary",
          order: 3
        },
        {
          icon: "fas fa-network-wired",
          title: "Networking",
          category: "Communication",
          bgColor: "bg-secondary/10",
          iconColor: "text-secondary",
          order: 4
        },
        {
          icon: "fas fa-project-diagram",
          title: "Project Mgmt",
          category: "IT Management",
          bgColor: "bg-accent/10",
          iconColor: "text-accent",
          order: 5
        },
        {
          icon: "fab fa-adobe",
          title: "Adobe Tools",
          category: "Design Tools",
          bgColor: "bg-primary/10",
          iconColor: "text-primary",
          order: 6
        },
        {
          icon: "fas fa-tasks",
          title: "Agile",
          category: "Methodologies",
          bgColor: "bg-secondary/10",
          iconColor: "text-secondary",
          order: 7
        }
      ];

      for (const skill of initialSkills) {
        await storage.createSkill(skill);
      }
      log('Skills seeded successfully');
    }
  } catch (error) {
    log(`Error seeding database: ${error}`);
  }
}
