export default function Skills() {
  const skills = [
    {
      icon: "fab fa-python",
      title: "Python",
      category: "Programming",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: "fab fa-java",
      title: "Java",
      category: "OOP Programming",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    },
    {
      icon: "fab fa-html5",
      title: "HTML5",
      category: "Web Development",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: "fab fa-css3-alt",
      title: "CSS3",
      category: "Styling & Layout",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: "fas fa-network-wired",
      title: "Networking",
      category: "Communication",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    },
    {
      icon: "fas fa-project-diagram",
      title: "Project Mgmt",
      category: "IT Management",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    },
    {
      icon: "fab fa-adobe",
      title: "Adobe Tools",
      category: "Design Tools",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      icon: "fas fa-tasks",
      title: "Agile",
      category: "Methodologies",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-skills-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">Technologies and tools I work with</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="skill-card bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-all"
              data-testid={`card-skill-${index}`}
            >
              <div className={`w-16 h-16 ${skill.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${skill.icon} ${skill.iconColor} text-2xl`}></i>
              </div>
              <h3 className="font-semibold text-lg mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
