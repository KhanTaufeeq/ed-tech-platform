import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Course, UserRole } from '../types'
import EnrollButton from './EnrollButton'
import { checkIsEnrolled } from '../lib/auth'

interface CourseDetailProps {
    course: Course
    userRole: UserRole | null
}

interface Enrollment {
    id: string
    userId: string
    courseId: string
    role: string
}

const ENROLL_USER = gql`
  mutation EnrollUserInCourse($userId: ID!, $courseId: ID!, $role: UserRole!) {
    enrollUserInCourse(userId: $userId, courseId: $courseId, role: $role) {
      id
    }
  }
`

export default function CourseDetail({ course, userRole }: CourseDetailProps) {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_enrollUser, { loading }] = useMutation(ENROLL_USER) // Prefixed with underscore to indicate intentionally unused
    const isEnrolled = checkIsEnrolled(course.id) || !!userRole

    const handleEnroll = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user') || '{}').id

            if (!userId) {
                router.push('/login')
                return
            }

            const enrollments: Enrollment[] = JSON.parse(localStorage.getItem('enrollments') || '[]')

            // Check if already enrolled
            if (enrollments.some((e: Enrollment) => e.userId === userId && e.courseId === course.id)) {
                router.push(`/courses/${course.id}`)
                return
            }

            // Add new enrollment
            enrollments.push({
                id: Date.now().toString(),
                userId,
                courseId: course.id,
                role: 'Student'
            })

            localStorage.setItem('enrollments', JSON.stringify(enrollments))

            // Redirect to confirmation page
            router.push({
                pathname: '/enrollment/confirmation',
                query: { courseId: course.id, courseTitle: course.title }
            })
        } catch (err) {
            console.error('Error enrolling:', err)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <span className={`text-sm px-3 py-1 rounded ${course.level === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                    course.level === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {course.level.toLowerCase()}
                </span>
            </div>

            <div className="prose max-w-none mb-6">
                <p>{course.description}</p>
            </div>

            <div className="flex space-x-4">
                {!isEnrolled ? (
                    <EnrollButton onClick={handleEnroll} isLoading={loading} />
                ) : (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        You are enrolled as {userRole || 'Student'}
                    </div>
                )}

                {userRole === UserRole.Professor && (
                    <Link
                        href={`/courses/edit/${course.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                        Edit Course
                    </Link>
                )}

                <Link
                    href="/courses"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                    Back to Courses
                </Link>
            </div>
        </div>
    )
}
