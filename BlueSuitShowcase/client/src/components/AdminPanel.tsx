import { useState } from 'react';
import { Experience, Skill } from '@shared/schema';

interface AdminPanelProps {
  experiences: Experience[];
  skills: Skill[];
  onExperiencesUpdate: () => void;
  onSkillsUpdate: () => void;
}

export default function AdminPanel({ experiences, skills, onExperiencesUpdate, onSkillsUpdate }: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'experiences' | 'skills'>('experiences');
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);

  const handleLogin = () => {
    if (password) {
      setIsAuthenticated(true);
    }
  };

  const makeAuthenticatedRequest = async (url: string, options: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'X-Admin-Password': password,
        'Content-Type': 'application/json',
      },
    });
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    const response = await makeAuthenticatedRequest(`/api/admin/experiences/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onExperiencesUpdate();
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    const response = await makeAuthenticatedRequest(`/api/admin/skills/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      onSkillsUpdate();
    }
  };

  const handleSaveExperience = async (exp: Partial<Experience>) => {
    const url = exp.id ? `/api/admin/experiences/${exp.id}` : '/api/admin/experiences';
    const method = exp.id ? 'PUT' : 'POST';

    const response = await makeAuthenticatedRequest(url, {
      method,
      body: JSON.stringify(exp),
    });

    if (response.ok) {
      onExperiencesUpdate();
      setEditingExp(null);
      setShowAddExp(false);
    }
  };

  const handleSaveSkill = async (skill: Partial<Skill>) => {
    const url = skill.id ? `/api/admin/skills/${skill.id}` : '/api/admin/skills';
    const method = skill.id ? 'PUT' : 'POST';

    const response = await makeAuthenticatedRequest(url, {
      method,
      body: JSON.stringify(skill),
    });

    if (response.ok) {
      onSkillsUpdate();
      setEditingSkill(null);
      setShowAddSkill(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-card p-8 rounded-xl border border-border max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/80 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background overflow-y-auto z-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'experiences'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Experiences
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'skills'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Skills
          </button>
        </div>

        {activeTab === 'experiences' && (
          <div>
            <button
              onClick={() => setShowAddExp(true)}
              className="mb-6 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80"
            >
              Add New Experience
            </button>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-card p-6 rounded-xl border border-border">
                  {editingExp?.id === exp.id ? (
                    <ExperienceForm
                      experience={editingExp}
                      onChange={setEditingExp}
                      onSave={() => handleSaveExperience(editingExp)}
                      onCancel={() => setEditingExp(null)}
                    />
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.company} - {exp.location}</p>
                      <p className="text-sm text-secondary">{exp.period}</p>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setEditingExp(exp)}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {showAddExp && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-card p-8 rounded-xl border border-border max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Add New Experience</h2>
                  <ExperienceForm
                    experience={{ title: '', company: '', location: '', period: '', responsibilities: [''], order: experiences.length }}
                    onChange={(exp) => {}}
                    onSave={() => handleSaveExperience({
                      title: (document.getElementById('exp-title') as HTMLInputElement).value,
                      company: (document.getElementById('exp-company') as HTMLInputElement).value,
                      location: (document.getElementById('exp-location') as HTMLInputElement).value,
                      period: (document.getElementById('exp-period') as HTMLInputElement).value,
                      responsibilities: Array.from(document.querySelectorAll('.exp-resp')).map(el => (el as HTMLInputElement).value).filter(v => v),
                      order: experiences.length,
                    })}
                    onCancel={() => setShowAddExp(false)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <button
              onClick={() => setShowAddSkill(true)}
              className="mb-6 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80"
            >
              Add New Skill
            </button>

            <div className="grid md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="bg-card p-6 rounded-xl border border-border">
                  {editingSkill?.id === skill.id ? (
                    <SkillForm
                      skill={editingSkill}
                      onChange={setEditingSkill}
                      onSave={() => handleSaveSkill(editingSkill)}
                      onCancel={() => setEditingSkill(null)}
                    />
                  ) : (
                    <>
                      <div className={`w-12 h-12 ${skill.bgColor} rounded-full flex items-center justify-center mb-4`}>
                        <i className={`${skill.icon} ${skill.iconColor} text-xl`}></i>
                      </div>
                      <h3 className="font-semibold">{skill.title}</h3>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => setEditingSkill(skill)}
                          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/80"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {showAddSkill && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-card p-8 rounded-xl border border-border max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold mb-4">Add New Skill</h2>
                  <SkillForm
                    skill={{ icon: 'fas fa-star', title: '', category: '', bgColor: 'bg-primary/10', iconColor: 'text-primary', order: skills.length }}
                    onChange={(skill) => {}}
                    onSave={() => handleSaveSkill({
                      icon: (document.getElementById('skill-icon') as HTMLInputElement).value,
                      title: (document.getElementById('skill-title') as HTMLInputElement).value,
                      category: (document.getElementById('skill-category') as HTMLInputElement).value,
                      bgColor: (document.getElementById('skill-bgColor') as HTMLInputElement).value,
                      iconColor: (document.getElementById('skill-iconColor') as HTMLInputElement).value,
                      order: skills.length,
                    })}
                    onCancel={() => setShowAddSkill(false)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceForm({ experience, onChange, onSave, onCancel }: { experience: any; onChange: (exp: any) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <input
        id="exp-title"
        defaultValue={experience.title}
        placeholder="Job Title"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
      />
      <input
        id="exp-company"
        defaultValue={experience.company}
        placeholder="Company"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
      />
      <input
        id="exp-location"
        defaultValue={experience.location}
        placeholder="Location"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
      />
      <input
        id="exp-period"
        defaultValue={experience.period}
        placeholder="Period (e.g., Jun 2024 - Aug 2024)"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
      />
      <div>
        <label className="block mb-2 text-sm font-medium">Responsibilities</label>
        {experience.responsibilities?.map((resp: string, i: number) => (
          <input
            key={i}
            className="exp-resp w-full px-4 py-2 bg-background border border-border rounded-lg mb-2"
            defaultValue={resp}
            placeholder={`Responsibility ${i + 1}`}
          />
        ))}
        <button
          onClick={() => onChange({ ...experience, responsibilities: [...(experience.responsibilities || []), ''] })}
          className="text-sm text-primary hover:underline"
        >
          + Add Responsibility
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={onSave} className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80">
          Save
        </button>
        <button onClick={onCancel} className="px-6 py-2 bg-muted rounded hover:bg-muted/80">
          Cancel
        </button>
      </div>
    </div>
  );
}

function SkillForm({ skill, onChange, onSave, onCancel }: { skill: any; onChange: (skill: any) => void; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="space-y-4">
      <input
        id="skill-icon"
        defaultValue={skill.icon}
        placeholder="Icon class (e.g., fab fa-python)"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm"
      />
      <input
        id="skill-title"
        defaultValue={skill.title}
        placeholder="Skill Title"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
      />
      <input
        id="skill-category"
        defaultValue={skill.category}
        placeholder="Category"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
      />
      <input
        id="skill-bgColor"
        defaultValue={skill.bgColor}
        placeholder="Background Color (e.g., bg-primary/10)"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm"
      />
      <input
        id="skill-iconColor"
        defaultValue={skill.iconColor}
        placeholder="Icon Color (e.g., text-primary)"
        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm"
      />
      <div className="flex gap-2">
        <button onClick={onSave} className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80">
          Save
        </button>
        <button onClick={onCancel} className="px-6 py-2 bg-muted rounded hover:bg-muted/80">
          Cancel
        </button>
      </div>
    </div>
  );
}
