# Portfolio Website - Nelson Ishmael Chinyere

## Overview

A personal portfolio website showcasing the professional background, skills, and experience of Nelson Ishmael Chinyere, a Software Engineering student. The application serves as a central hub for career opportunities, displaying technical skills, work experience, services offered, and providing a contact mechanism for potential clients and recruiters.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework and Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Component-based architecture with modular sections (Hero, About, Services, Skills, Experience, Achievements, Contact, Footer)

**UI Component System**
- shadcn/ui design system built on Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with CSS custom properties for theming
- Dark mode design with cyberpunk-inspired color scheme (primary blue: hsl(198, 93%, 60%), secondary purple, accent pink)
- Responsive mobile-first design with breakpoint-aware navigation

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local component state with React hooks for UI interactions
- Dynamic data fetching for experiences and skills from backend API

**Key Features**
- Typewriter animation effect for role titles in hero section
- Smooth scroll navigation between sections
- Rate-limited contact form with email integration
- Admin panel with keyboard shortcut access (Ctrl+Shift+A)
- CV download functionality
- Achievements gallery with certificate display and modal detail view

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for REST API endpoints
- ESM module system for modern JavaScript features
- Middleware-based request processing pipeline

**API Design**
- RESTful endpoints for CRUD operations on experiences and skills
- Contact form submission endpoint with rate limiting (5 requests per 15 minutes)
- Admin-protected routes using password-based authentication via headers

**Development Setup**
- Hot reload development server integrated with Vite
- Production build uses ESBuild for server bundling
- Custom logging middleware for API request monitoring

**Route Structure**
- `/api/contact` - Contact form submissions
- `/api/experiences` - Experience CRUD operations
- `/api/skills` - Skills CRUD operations
- `/api/achievements` - Achievements and certifications retrieval
- Admin routes protected by `requireAdmin` middleware

### Data Storage Solutions

**Database**
- PostgreSQL database hosted on Neon (serverless)
- Drizzle ORM for type-safe database queries and schema management
- WebSocket-based connection for serverless compatibility

**Schema Design**
- `users` table: UUID primary key, username/password authentication
- `experiences` table: Serial ID, job details, responsibilities array, ordering
- `skills` table: Serial ID, icon class, category, styling properties, ordering
- `achievements` table: Serial ID, title, issuer, date, description, image URL, category, ordering

**Data Access Layer**
- `DbStorage` class implementing `IStorage` interface for abstraction
- Centralized database client exported from storage module
- Migration management via Drizzle Kit

**Session Management**
- Express sessions configured for user authentication
- PostgreSQL session store using connect-pg-simple

### Authentication and Authorization

**Admin Authentication**
- Header-based authentication using `X-Admin-Password`
- Environment variable for admin password storage
- Middleware-based route protection for admin endpoints

**User Authentication Infrastructure**
- User schema with username and password fields
- CRUD operations for user management in storage layer
- Foundation for future authentication expansion

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

**Email Service**
- Replit Mail API integration for contact form submissions
- Server-side email sending to portfolio owner
- Authentication via Replit identity tokens

**Database and ORM**
- Drizzle ORM: Type-safe database queries
- @neondatabase/serverless: Neon PostgreSQL driver with WebSocket support
- Drizzle Kit: Migration management and schema pushing

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