import { useAuth } from '../context/AuthContext'

export const getUserRole = (courseId: string) => {
  const { user } = useAuth()
  if (!user) return null
  
  // In a real app, this would check the enrollment for the specific course
  // Here we'll mock it by checking localStorage
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
  const enrollment = enrollments.find(
    (e: any) => e.userId === user.id && e.courseId === courseId
  )
  
  return enrollment ? enrollment.role : null
}

export const checkIsEnrolled = (courseId: string) => {
  const { user } = useAuth()
  if (!user) return false
  
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
  return enrollments.some(
    (e: any) => e.userId === user.id && e.courseId === courseId
  )
}

export const enrollInCourse = (courseId: string, role = 'Student') => {
  const { user } = useAuth()
  if (!user) return false
  
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
  
  // Check if already enrolled
  if (enrollments.some((e: any) => e.userId === user.id && e.courseId === courseId)) {
    return false
  }
  
  // Add new enrollment
  enrollments.push({
    id: Date.now().toString(),
    userId: user.id,
    courseId,
    role
  })
  
  localStorage.setItem('enrollments', JSON.stringify(enrollments))
  return true
}
