import gql from 'graphql-tag';

export const typeDefs = gql`
  enum UserRole {
    Student
    Professor
  }
  
  enum CourseLevel {
    Beginner
    Intermediate
    Advanced
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    enrollments: [Enrollment!]!
  }
  
  type Course {
    id: ID!
    title: String!
    description: String!
    level: CourseLevel!
    enrollments: [Enrollment!]!
  }

  type Enrollment {
    id: ID!
    user: User!
    course: Course!
    role: UserRole!
  }

  type Query {
    allUsers: [User!]!
    allCourses: [Course!]!
    course(id: ID!): Course
    user(id: ID!): User
    enrollmentsByUser(userId: ID!): [Enrollment!]!
  }

  type Mutation {
    enrollUserInCourse(userId: ID!, courseId: ID!, role: UserRole!): Enrollment!
    updateCourse(id: ID!, title: String, description: String, level: CourseLevel): Course!
  }
`;
