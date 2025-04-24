# EdTech Learning Platform

A simple EdTech web application where users can browse and enroll in courses, with basic role-based access.

## Live Demo

[View Live Demo on Vercel](https://edtech-platform.vercel.app/)

## Features

- Browse all available courses
- View detailed course information
- Enroll in courses as a student
- Role-based access (Student/Professor)
- Professors can edit course content
- Authentication (mock login)

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Apollo Client
- **Backend**: GraphQL API with Apollo Server
- **Database**: PostgreSQL with Prisma ORM

## Project Structure

```
/edtech-platform
├── prisma/               # Database schema and migrations
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context API for state management
│   ├── graphql/          # GraphQL schema and resolvers
│   ├── lib/              # Utility functions
│   ├── pages/            # Next.js pages
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
└── public/               # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/edtech-platform.git
   cd edtech-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy the `.env.example` file to `.env` and update the database URL:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/edtech_db"
   NEXT_PUBLIC_API_URL="http://localhost:3000/api/graphql"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the Application

### Test Accounts
- Student: student@example.com / password
- Professor: professor@example.com / password

### User Flow
1. Log in with one of the test accounts
2. Browse available courses
3. View course details
4. Enroll in a course
5. If logged in as a professor, you can edit course content

## Deployment

The application is deployed on Vercel. Any push to the main branch will trigger an automatic deployment.

## Future Improvements

- Add real authentication with JWT
- Implement course search and filtering
- Add course ratings and reviews
- Create a user dashboard
- Add pagination for course listings
- Implement file uploads for course materials
