import { useState, useEffect } from 'react';
import { Experience as ExperienceType } from '@shared/schema';

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading experiences...</p>
        </div>
      </section>
    );
  }

  const education = [
    {
      degree: "Bachelor's Degree",
      field: "Software Engineering",
      institution: "ZCAS University",
      period: "Expected Aug 2027",
      icon: "fas fa-graduation-cap",
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    },
    {
      degree: "National Foundation Certificate",
      field: "Computer Operations & Packages",
      institution: "Harare Polytechnic",
      period: "Dec 2021",
      icon: "fas fa-certificate",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    },
    {
      degree: "National Foundation Certificate",
      field: "ICT Fundamentals",
      institution: "Harare Polytechnic",
      period: "Dec 2021",
      icon: "fas fa-certificate",
      bgColor: "bg-accent/10",
      iconColor: "text-accent"
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-experience-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">My professional journey and achievements</p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-xl border border-border"
              data-testid={`card-experience-${index}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary">{experience.title}</h3>
                  <h4 className="text-lg font-medium">{experience.company}</h4>
                  <p className="text-muted-foreground">{experience.location}</p>
                </div>
                <div className="text-secondary font-medium">{experience.period}</div>
              </div>
              <ul className="text-muted-foreground space-y-2">
                {experience.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex} className="flex items-start">
                    <i className="fas fa-chevron-right text-primary mr-2 mt-1 text-sm"></i>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Education Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-center mb-12" data-testid="text-education-title">Education</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl border border-border text-center"
                data-testid={`card-education-${index}`}
              >
                <div className={`w-16 h-16 ${edu.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${edu.icon} ${edu.iconColor} text-2xl`}></i>
                </div>
                <h4 className="font-semibold text-lg mb-2">{edu.degree}</h4>
                <p className="text-secondary mb-2">{edu.field}</p>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
