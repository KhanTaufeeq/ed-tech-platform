import { PrismaClient, CourseLevel, UserRole } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Student User',
      email: 'student@example.com',
    },
  })

  const professor = await prisma.user.upsert({
    where: { email: 'professor@example.com' },
    update: {},
    create: {
      name: 'Professor User',
      email: 'professor@example.com',
    },
  })

  console.log('Created users:', { student, professor })

  // Create Courses
  const webDevCourse = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build your first website. This course covers fundamental concepts and provides hands-on experience with modern web technologies.',
      level: CourseLevel.BEGINNER,
    },
  })

  const reactCourse = await prisma.course.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'React.js Fundamentals',
      description: 'Master React.js, the popular JavaScript library for building user interfaces. Learn component-based architecture, state management, and how to build single-page applications.',
      level: CourseLevel.INTERMEDIATE,
    },
  })

  const aiCourse = await prisma.course.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Artificial Intelligence and Machine Learning',
      description: 'Dive into the world of AI and ML with this comprehensive course. Learn about neural networks, deep learning, data preprocessing, and how to build intelligent systems.',
      level: CourseLevel.ADVANCED,
    },
  })

  console.log('Created courses:', { webDevCourse, reactCourse, aiCourse })

  // Create Enrollments
  const studentEnrollment = await prisma.enrollment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user_id: student.id,
      course_id: webDevCourse.id,
      role: UserRole.Student,
    },
  })

  const professorEnrollment = await prisma.enrollment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      user_id: professor.id,
      course_id: reactCourse.id,
      role: UserRole.Professor,
    },
  })

  console.log('Created enrollments:', { studentEnrollment, professorEnrollment })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
