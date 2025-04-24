import { useQuery, gql } from '@apollo/client'
import { Course } from '../../types'
import CourseList from '../../components/CourseList'

const GET_COURSES = gql`
  query GetAllCourses {
    allCourses {
      id
      title
      description
      level
    }
  }
`

export default function Courses() {
    const { loading, error, data } = useQuery(GET_COURSES)

    if (loading) return <p className="text-center py-8">Loading courses...</p>
    if (error) return <p className="text-center py-8 text-red-500">Error loading courses: {error.message}</p>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
            <CourseList courses={data?.allCourses || []} />
        </div>
    )
}
