import { Course } from '../types'
import CourseCard from './CourseCard'

interface CourseListProps {
    courses: Course[]
}

export default function CourseList({ courses }: CourseListProps) {
    if (courses.length === 0) {
        return <p className="text-center py-8">No courses found.</p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}
