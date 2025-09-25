# Portfolio Website - Nelson Ishmael Chinyere

## Overview

This is a personal portfolio website for Nelson Ishmael Chinyere, a Software Engineering student showcasing his professional background, skills, and experience in software development, IT support, and graphic design. The application is built as a full-stack web application with a React frontend and Express.js backend, designed to serve as a central hub for professional branding and networking opportunities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Component Structure**: Modular component architecture with sections for Hero, About, Services, Skills, Experience, Contact, and Footer
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: RESTful API design with route-based organization
- **Development Setup**: Hot reload with Vite integration for development
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage)
- **API Structure**: Centralized route registration with error handling middleware
- **Build Process**: ESBuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle with schema definitions and migrations support
- **Connection**: Neon Database serverless connection
- **Schema Management**: Type-safe schema definitions with Zod validation
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage

### Authentication and Authorization
- **User Schema**: Basic user model with username/password fields
- **Session Management**: Express session handling with PostgreSQL storage
- **Storage Methods**: CRUD operations abstracted through IStorage interface
- **Security**: Password handling and user management infrastructure in place

### External Dependencies

#### UI and Design
- **Radix UI**: Comprehensive component library for accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Typography with Architects Daughter, DM Sans, Fira Code, and Geist Mono

#### Database and ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **Drizzle Kit**: Database migration and schema management tools

#### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins for cartographer and dev banner

#### Form and State Management
- **React Hook Form**: Form handling with validation
- **TanStack Query**: Server state management and caching
- **Zod**: Schema validation library integrated with forms and database

#### Additional Libraries
- **Date-fns**: Date manipulation and formatting
- **Embla Carousel**: Carousel component functionality
- **Lucide React**: Additional icon library
- **Class Variance Authority**: Utility for managing component variants
- **CMDK**: Command palette functionality