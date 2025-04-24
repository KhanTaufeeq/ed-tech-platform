import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import CourseDetail from '../../components/CourseDetail'
import { useAuth } from '../../context/AuthContext'
import { getUserRole } from '../../lib/auth'

const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      title
      description
      level
    }
  }
`

export default function CourseDetailPage() {
    const router = useRouter()
    const { id } = router.query
    const { isAuthenticated } = useAuth()

    const { loading, error, data } = useQuery(GET_COURSE, {
        variables: { id },
        skip: !id
    })

    if (!isAuthenticated) {
        router.push('/login')
        return null
    }

    if (loading) return <p className="text-center py-8">Loading course details...</p>
    if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>
    if (!data?.course) return <p className="text-center py-8">Course not found</p>

    const userRole = getUserRole(id as string)

    return (
        <div className="container mx-auto px-4 py-8">
            <CourseDetail course={data.course} userRole={userRole} />
        </div>
    )
}
