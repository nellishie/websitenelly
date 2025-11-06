-- ============================================
-- COMPLETE PRODUCTION DATABASE SETUP
-- Copy and paste this ENTIRE file into your Vercel Postgres database console
-- ============================================

-- Create all tables
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL,
  "order" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  bg_color TEXT NOT NULL,
  icon_color TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  "order" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cv_files (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_data BYTEA NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT false
);

-- Clear existing data (if any)
DELETE FROM experiences;
DELETE FROM skills;
DELETE FROM achievements;

-- Insert Experiences
INSERT INTO experiences (title, company, location, period, responsibilities, "order")
VALUES 
  (
    'Graphic Designer',
    'Dico Interiors',
    'Harare, Zimbabwe',
    'Dec 2024 – Feb 2025',
    ARRAY['Produced high-quality product packaging designs', 'Designed user interfaces for apps and websites', 'Assisted video production with motion graphics', 'Updated social media profiles with fresh graphics'],
    0
  ),
  (
    'IT Technician',
    'Coverlink Holdings',
    'Harare, Zimbabwe',
    'Jun 2024 – Aug 2024',
    ARRAY['Managed IT backups and infrastructure plans', 'Maintained systems and performed troubleshooting', 'Kept IT asset records and ensured system security'],
    1
  ),
  (
    'Web Developer',
    'ZCAS University',
    'Lusaka, Zambia',
    'Mar 2024 – Apr 2024',
    ARRAY['Developed a website "Wina Bwangu" for transactions'],
    2
  );

-- Insert Skills
INSERT INTO skills (icon, title, category, bg_color, icon_color, "order")
VALUES 
  ('fab fa-python', 'Python', 'Programming', 'bg-primary/10', 'text-primary', 0),
  ('fab fa-java', 'Java', 'OOP Programming', 'bg-secondary/10', 'text-secondary', 1),
  ('fab fa-html5', 'HTML5', 'Web Development', 'bg-accent/10', 'text-accent', 2),
  ('fab fa-css3-alt', 'CSS3', 'Styling & Layout', 'bg-primary/10', 'text-primary', 3),
  ('fas fa-network-wired', 'Networking', 'Communication', 'bg-secondary/10', 'text-secondary', 4),
  ('fas fa-project-diagram', 'Project Mgmt', 'IT Management', 'bg-accent/10', 'text-accent', 5),
  ('fab fa-adobe', 'Adobe Tools', 'Design Tools', 'bg-primary/10', 'text-primary', 6),
  ('fas fa-tasks', 'Agile', 'Methodologies', 'bg-secondary/10', 'text-secondary', 7);

-- Insert Achievements (Certificates)
INSERT INTO achievements (title, issuer, date, description, image_url, category, "order")
VALUES 
  (
    'Introduction to Cybersecurity',
    'Cisco Networking Academy',
    'Sep 25, 2025',
    'Student level credential for completing the Introduction to Cybersecurity course',
    '/certificates/cisco-cybersecurity.png',
    'cybersecurity',
    0
  ),
  (
    'Introduction to Internet of Things',
    'Cisco Networking Academy',
    'Sep 26, 2025',
    'Student level credential for completing the Introduction to Internet of Things course',
    '/certificates/cisco-iot.png',
    'networking',
    1
  ),
  (
    'Career Essentials in GitHub Professional Certificate',
    'LinkedIn Learning & GitHub',
    'Oct 13, 2025',
    'Learning Path completed by Nelson Chinyere - 4 hours 18 minutes',
    '/certificates/github-career-essentials.png',
    'development',
    2
  ),
  (
    'Introduction to Modern AI',
    'Cisco Networking Academy',
    'Sep 27, 2025',
    'Student level credential for completing the Introduction to Modern AI course',
    '/certificates/cisco-modern-ai.png',
    'artificial intelligence',
    3
  ),
  (
    'Python Essentials 2',
    'Cisco Networking Academy & Python Institute',
    'Oct 10, 2025',
    'Student level credential for completing the Python Essentials 2 course',
    '/certificates/python-essentials-2.png',
    'programming',
    4
  ),
  (
    'Python Essentials 1',
    'Cisco Networking Academy & Python Institute',
    'Oct 03, 2025',
    'Student level credential for completing the Python Essentials 1 course',
    '/certificates/python-essentials-1.png',
    'programming',
    5
  ),
  (
    'Ethical Hacker',
    'Cisco Networking Academy',
    'Sep 29, 2025',
    'Student level credential for completing the Ethical Hacker course',
    '/certificates/cisco-ethical-hacker.png',
    'cybersecurity',
    6
  );

-- Verify data was inserted
SELECT 'Experiences:' as table_name, COUNT(*) as row_count FROM experiences
UNION ALL
SELECT 'Skills:', COUNT(*) FROM skills
UNION ALL
SELECT 'Achievements:', COUNT(*) FROM achievements;
