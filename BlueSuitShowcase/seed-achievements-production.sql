-- SQL script to seed achievements data into production database
-- Run this against your Vercel production database

-- First, create the achievements table if it doesn't exist
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

-- Insert all 7 certificate achievements
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
  )
ON CONFLICT DO NOTHING;

-- Verify the data was inserted
SELECT COUNT(*) as total_achievements FROM achievements;
