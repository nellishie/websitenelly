# Portfolio Website - Nelson Ishmael Chinyere

## Overview

A personal portfolio website showcasing the professional background, skills, and experience of Nelson Ishmael Chinyere, a Software Engineering student. The application serves as a central hub for career opportunities, displaying technical skills, work experience, services offered, and providing a contact mechanism for potential clients and recruiters.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Static Site Architecture

**Framework and Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Component-based architecture with modular sections (Hero, About, Services, Skills, Experience, Achievements, Contact, Footer)
- Fully static site with no backend server or database dependencies

**UI Component System**
- shadcn/ui design system built on Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with CSS custom properties for theming
- Dark mode design with cyberpunk-inspired color scheme (primary blue: hsl(198, 93%, 60%), secondary purple, accent pink)
- Responsive mobile-first design with breakpoint-aware navigation

**Data Management**
- All data stored in static TypeScript files in `client/src/data/`
  - `experiences.ts` - 3 work experience entries with job details and responsibilities
  - `skills.ts` - 8 technical skills with icons, categories, and styling
  - `achievements.ts` - 7 certifications with images, dates, and descriptions
- Components import data directly from static files (no API calls)
- Local component state with React hooks for UI interactions only

**Key Features**
- Typewriter animation effect for role titles in hero section
- Smooth scroll navigation between sections
- Contact section (UI only, no backend integration)
- Achievements gallery with certificate display and modal detail view
- Certificate images stored in `client/public/certificates/`

### Removed Features
- Backend server (Express.js) - removed for simplified Vercel deployment
- Database (PostgreSQL) - replaced with static data files
- Admin panel - removed as data is now hardcoded
- Contact form submission - backend removed, form is UI only
- CV download functionality - removed per user request

### External Dependencies

**UI Component Libraries**
- Radix UI: 20+ primitive components (Dialog, Dropdown, Popover, Tabs, etc.)
- cmdk: Command palette component
- embla-carousel-react: Carousel/slider functionality
- react-day-picker: Date selection components
- lucide-react: Icon system

**Form Management**
- React Hook Form: Form state and validation
- @hookform/resolvers: Integration with Zod validation
- Zod: Schema validation for forms and API requests
- drizzle-zod: Type-safe schema generation from Drizzle schemas

**Styling and Utilities**
- Tailwind CSS: Utility-first styling framework
- class-variance-authority: Component variant management
- clsx & tailwind-merge: Conditional class name handling
- date-fns: Date formatting and manipulation

**Development Tools**
- Replit-specific plugins for development experience (error overlay, cartographer, dev banner)
- TypeScript for full-stack type safety
- Express rate limiting for API protection

**Deployment**
- Vercel-optimized build configuration
- Static asset caching with cache control headers
- API route rewrites and SPA fallback routing