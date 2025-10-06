import { useState, useEffect } from "react";
import profileImage from "@assets/IMG_20231127_002204_012_1758821976384.jpg";

const roles = [
  'Software Engineer',
  'Web Developer', 
  'Software Developer',
  'Data Analyst'
];

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText !== currentRole) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else if (isDeleting && displayText !== '') {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Create a link to download the CV file
    const link = document.createElement('a');
    link.href = '/My_CV_1759058330378.pdf';
    link.download = 'My_CV_1759058330378.pdf';
    link.target = '_blank';
    link.click();
  };

  return (
    <section id="home" className="hero-gradient min-h-screen flex items-center pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="lg:w-1/2 w-full">
            <div className="mb-3">
              <span className="text-base md:text-lg text-muted-foreground">Hello, It's Me</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4" data-testid="text-hero-name">
              Nelson Ishmael Chinyere
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">
              <span>And I'm a </span>
              <span className="gradient-text font-bold">{displayText}<span className="animate-pulse">|</span></span>
            </div>
            <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-lg" data-testid="text-hero-description">
              Enthusiastic and detail-oriented Software Engineering student with hands-on experience in IT support and graphic design. Passionate about leveraging technology to solve problems.
            </p>
            <div className="flex space-x-3 md:space-x-4 mb-6 md:mb-8">
              <a 
                href="https://wa.me/260772752623" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp text-lg md:text-xl"></i>
              </a>
              <a 
                href="https://github.com/nellishie" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github text-lg md:text-xl"></i>
              </a>
              <a 
                href="https://linkedin.com/in/nelson-chinyere-45150a336" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                data-testid="link-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin text-lg md:text-xl"></i>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button 
                onClick={scrollToAbout}
                className="bg-primary text-primary-foreground px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-primary/80 transition-colors text-sm md:text-base"
                data-testid="button-more-about-me"
              >
                More About Me
              </button>
              <button 
                onClick={downloadCV}
                className="bg-secondary text-secondary-foreground px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                data-testid="button-download-cv"
              >
                <i className="fas fa-download"></i>
                Download My CV
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            <div className="gradient-border profile-glow">
              <img 
                src={profileImage} 
                alt="Nelson Ishmael Chinyere in blue suit" 
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded-full"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
