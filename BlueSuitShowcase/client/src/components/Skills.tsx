import { useState, useEffect } from 'react';
import { Skill } from '@shared/schema';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading skills...</p>
        </div>
      </section>
    );
  }

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
