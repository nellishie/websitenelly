import { useState, useEffect } from 'react';
import { Achievement as AchievementType } from '@shared/schema';

export default function Achievements() {
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<AchievementType | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      if (response.ok) {
        const data = await response.json();
        setAchievements(data);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="achievements" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Loading achievements...</p>
        </div>
      </section>
    );
  }

  const categories = Array.from(new Set(achievements.map(a => a.category)));

  return (
    <section id="achievements" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-achievements-title">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg">Professional certifications and accomplishments</p>
        </div>

        {categories.map((category) => {
          const categoryAchievements = achievements.filter(a => a.category === category);
          
          return (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-primary capitalize">
                {category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setSelectedCertificate(achievement)}
                    data-testid={`card-achievement-${achievement.id}`}
                  >
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={achievement.imageUrl} 
                        alt={achievement.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <i className="fas fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-foreground">{achievement.title}</h4>
                    <p className="text-secondary font-medium mb-1">{achievement.issuer}</p>
                    <p className="text-muted-foreground text-sm mb-2">{achievement.date}</p>
                    {achievement.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2">{achievement.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {selectedCertificate && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <div 
              className="bg-card max-w-4xl w-full rounded-xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedCertificate(null)}
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
              <div className="mb-4">
                <img 
                  src={selectedCertificate.imageUrl} 
                  alt={selectedCertificate.title}
                  className="w-full rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{selectedCertificate.title}</h3>
              <p className="text-secondary font-medium mb-2">{selectedCertificate.issuer}</p>
              <p className="text-muted-foreground mb-4">{selectedCertificate.date}</p>
              {selectedCertificate.description && (
                <p className="text-muted-foreground">{selectedCertificate.description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
