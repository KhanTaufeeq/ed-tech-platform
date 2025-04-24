import { useRouter } from 'next/router'
import Link from 'next/link'

export default function EnrollmentConfirmation() {
    const router = useRouter()
    const { courseId, courseTitle } = router.query

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Enrollment Successful!</h1>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p>You have successfully enrolled in <strong>{courseTitle}</strong>.</p>
            </div>
            <div className="flex justify-center space-x-4">
                <Link href={`/courses/${courseId}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Go to Course
                </Link>
                <Link href="/courses" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                    Browse More Courses
                </Link>
            </div>
        </div>
    )
}
