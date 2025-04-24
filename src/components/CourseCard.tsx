import Link from 'next/link'
import { Course, CourseLevel } from '../types'

interface CourseCardProps {
    course: Course
}

const getLevelBadgeColor = (level: CourseLevel) => {
    switch (level) {
        case CourseLevel.Beginner:
            return 'bg-green-100 text-green-800'
        case CourseLevel.Intermediate:
            return 'bg-yellow-100 text-yellow-800'
        case CourseLevel.Advanced:
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export default function CourseCard({ course }: CourseCardProps) {
    const levelBadgeColor = getLevelBadgeColor(course.level)

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{course.title}</h2>
                    <span className={`text-xs px-2 py-1 rounded ${levelBadgeColor}`}>
                        {course.level.toLowerCase()}
                    </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                <Link
                    href={`/courses/${course.id}`}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}
