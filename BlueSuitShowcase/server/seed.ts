import { storage } from "./storage";

async function seed() {
  console.log('Seeding database...');

  const experiences = [
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

  const skills = [
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

  try {
    for (const exp of experiences) {
      await storage.createExperience(exp);
    }
    console.log('Experiences seeded');

    for (const skill of skills) {
      await storage.createSkill(skill);
    }
    console.log('Skills seeded');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
