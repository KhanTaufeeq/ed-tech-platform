const resolvers = {
  Query: {
    allUsers: async (_, __, { prisma }) => {
      return await prisma.user.findMany()
    },
    allCourses: async (_, __, { prisma }) => {
      return await prisma.course.findMany()
    },
    course: async (_, { id }, { prisma }) => {
      return await prisma.course.findUnique({
        where: { id: parseInt(id) }
      })
    },
    user: async (_, { id }, { prisma }) => {
      return await prisma.user.findUnique({
        where: { id: parseInt(id) }
      })
    },
    enrollmentsByUser: async (_, { userId }, { prisma }) => {
      return await prisma.enrollment.findMany({
        where: { user_id: parseInt(userId) },
        include: {
          course: true,
          user: true
        }
      })
    }
  },
  Mutation: {
    enrollUserInCourse: async (_, { userId, courseId, role }, { prisma }) => {
      return await prisma.enrollment.create({
        data: {
          user_id: parseInt(userId),
          course_id: parseInt(courseId),
          role
        },
        include: {
          user: true,
          course: true
        }
      })
    },
    updateCourse: async (_, { id, title, description, level }, { prisma }) => {
      return await prisma.course.update({
        where: {
          id: parseInt(id)
        },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(level && { level })
        }
      })
    }
  },
  User: {
    enrollments: async (parent, _, { prisma }) => {
      return await prisma.enrollment.findMany({
        where: { user_id: parent.id },
        include: {
          course: true
        }
      })
    }
  },
  Course: {
    enrollments: async (parent, _, { prisma }) => {
      return await prisma.enrollment.findMany({
        where: { course_id: parent.id },
        include: {
          user: true
        }
      })
    }
  },
  Enrollment: {
    user: async (parent, _, { prisma }) => {
      if (parent.user) return parent.user
      return await prisma.user.findUnique({
        where: { id: parent.user_id }
      })
    },
    course: async (parent, _, { prisma }) => {
      if (parent.course) return parent.course
      return await prisma.course.findUnique({
        where: { id: parent.course_id }
      })
    }
  }
}

export default resolvers
