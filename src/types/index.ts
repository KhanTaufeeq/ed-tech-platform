export enum UserRole {
  Student = 'Student',
  Professor = 'Professor'
}

export enum CourseLevel {
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE',
  Advanced = 'ADVANCED'
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Course {
  id: string
  title: string
  description: string
  level: CourseLevel
}

export interface Enrollment {
  id: string
  user: User
  course: Course
  role: UserRole
}
