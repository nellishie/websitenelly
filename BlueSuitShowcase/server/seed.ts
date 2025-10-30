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

  const achievements = [
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Sep 25, 2025",
      description: "Student level credential for completing the Introduction to Cybersecurity course",
      imageUrl: "/certificates/cisco-cybersecurity.png",
      category: "cybersecurity",
      order: 0
    },
    {
      title: "Introduction to Internet of Things",
      issuer: "Cisco Networking Academy",
      date: "Sep 26, 2025",
      description: "Student level credential for completing the Introduction to Internet of Things course",
      imageUrl: "/certificates/cisco-iot.png",
      category: "networking",
      order: 1
    },
    {
      title: "Career Essentials in GitHub Professional Certificate",
      issuer: "LinkedIn Learning & GitHub",
      date: "Oct 13, 2025",
      description: "Learning Path completed by Nelson Chinyere - 4 hours 18 minutes",
      imageUrl: "/certificates/github-career-essentials.png",
      category: "development",
      order: 2
    },
    {
      title: "Introduction to Modern AI",
      issuer: "Cisco Networking Academy",
      date: "Sep 27, 2025",
      description: "Student level credential for completing the Introduction to Modern AI course",
      imageUrl: "/certificates/cisco-modern-ai.png",
      category: "artificial intelligence",
      order: 3
    },
    {
      title: "Python Essentials 2",
      issuer: "Cisco Networking Academy & Python Institute",
      date: "Oct 10, 2025",
      description: "Student level credential for completing the Python Essentials 2 course",
      imageUrl: "/certificates/python-essentials-2.png",
      category: "programming",
      order: 4
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco Networking Academy & Python Institute",
      date: "Oct 03, 2025",
      description: "Student level credential for completing the Python Essentials 1 course",
      imageUrl: "/certificates/python-essentials-1.png",
      category: "programming",
      order: 5
    },
    {
      title: "Ethical Hacker",
      issuer: "Cisco Networking Academy",
      date: "Sep 29, 2025",
      description: "Student level credential for completing the Ethical Hacker course",
      imageUrl: "/certificates/cisco-ethical-hacker.png",
      category: "cybersecurity",
      order: 6
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

    for (const achievement of achievements) {
      await storage.createAchievement(achievement);
    }
    console.log('Achievements seeded');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
