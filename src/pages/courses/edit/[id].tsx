import { useRouter } from 'next/router'
import { useQuery, useMutation, gql } from '@apollo/client'
import { getUserRole } from '../../../lib/auth'
import CourseEditForm from '../../../components/CourseEditForm'
import { useAuth } from '../../../context/AuthContext'

const GET_COURSE = gql`
  query GetCourseForEdit($id: ID!) {
    course(id: $id) {
      id
      title
      description
      level
    }
  }
`

const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $title: String, $description: String, $level: CourseLevel) {
    updateCourse(id: $id, title: $title, description: $description, level: $level) {
      id
      title
      description
      level
    }
  }
`

export default function EditCourse() {
    const router = useRouter()
    const { id } = router.query
    const { isAuthenticated } = useAuth()

    const { loading, error, data } = useQuery(GET_COURSE, {
        variables: { id },
        skip: !id
    })

    const [updateCourse, { loading: updating }] = useMutation(UPDATE_COURSE)

    if (!isAuthenticated) {
        router.push('/login')
        return null
    }

    // Check if user is a professor for this course
    const userRole = getUserRole(id as string)
    if (userRole !== 'Professor') {
        router.push(`/courses/${id}`)
        return null
    }

    if (loading) return <p className="text-center py-8">Loading course data...</p>
    if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>
    if (!data?.course) return <p className="text-center py-8">Course not found</p>

    const handleUpdateCourse = async (courseData: { title: string, description: string, level: string }) => {
        try {
            await updateCourse({
                variables: {
                    id,
                    ...courseData
                }
            })
            router.push(`/courses/${id}`)
        } catch (err) {
            console.error('Error updating course:', err)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
            <CourseEditForm
                course={data.course}
                onSubmit={handleUpdateCourse}
                isSubmitting={updating}
            />
        </div>
    )
}


