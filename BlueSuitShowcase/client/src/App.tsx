import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { Experience as ExperienceType, Skill } from "@shared/schema";

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
    fetchSkills();

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
      
      {showAdmin && (
        <AdminPanel
          experiences={experiences}
          skills={skills}
          onExperiencesUpdate={fetchExperiences}
          onSkillsUpdate={fetchSkills}
        />
      )}
    </div>
  );
}

export default App;
