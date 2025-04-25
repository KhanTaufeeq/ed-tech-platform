// import { useRouter } from 'next/router'
// import { useQuery, gql } from '@apollo/client'
// import CourseDetail from '../../components/CourseDetail'
// import { useAuth } from '../../context/AuthContext'
// import { getUserRole } from '../../lib/auth'

// const GET_COURSE = gql`
//   query GetCourse($id: ID!) {
//     course(id: $id) {
//       id
//       title
//       description
//       level
//     }
//   }
// `

// export default function CourseDetailPage() {
//     const router = useRouter()
//     const { id } = router.query
//     const { isAuthenticated } = useAuth()

//     const { loading, error, data } = useQuery(GET_COURSE, {
//         variables: { id },
//         skip: !id
//     })

//     if (!isAuthenticated) {
//         router.push('/login')
//         return null
//     }

//     if (loading) return <p className="text-center py-8">Loading course details...</p>
//     if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>
//     if (!data?.course) return <p className="text-center py-8">Course not found</p>

//     const userRole = getUserRole(id as string)

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <CourseDetail course={data.course} userRole={userRole} />
//         </div>
//     )
// }

// import { useRouter } from 'next/router'
// import { useQuery, gql } from '@apollo/client'
// import CourseDetail from '../../components/CourseDetail'
// import { useAuth } from '../../context/AuthContext'
// import { useGetUserRole } from '../../lib/auth'
// import { UserRole } from '../../types'

// const GET_COURSE = gql`
//   query GetCourse($id: ID!) {
//     course(id: $id) {
//       id
//       title
//       description
//       level
//     }
//   }
// `

// export default function CourseDetailPage() {
//     const router = useRouter()
//     const { id } = router.query
//     const { isAuthenticated } = useAuth()

//     // Use the hook version of getUserRole
//     const userRole = useGetUserRole(id as string)

//     const { loading, error, data } = useQuery(GET_COURSE, {
//         variables: { id },
//         skip: !id
//     })

//     if (!isAuthenticated) {
//         router.push('/login')
//         return null
//     }

//     if (loading) return <p className="text-center py-8">Loading course details...</p>
//     if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>
//     if (!data?.course) return <p className="text-center py-8">Course not found</p>

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <CourseDetail course={data.course} userRole={userRole as UserRole | null} />
//         </div>
//     )
// }


import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import CourseDetail from '../../components/CourseDetail'
import { useAuth } from '../../context/AuthContext'
import { useGetUserRole } from '../../lib/auth'
import { UserRole } from '../../types'

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
    const [isClient, setIsClient] = useState(false)

    // Only run auth checks on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    const { loading, error, data } = useQuery(GET_COURSE, {
        variables: { id },
        skip: !id
    })

    // Only access auth-related hooks on the client side
    const { isAuthenticated } = useAuth()
    // const userRole = id && isClient ? useGetUserRole(id as string) : null
    const idStr = typeof id === 'string' ? id : undefined
    const userRole = useGetUserRole(idStr)

    // Don't perform client-side redirects during SSR
    useEffect(() => {
        if (isClient && !isAuthenticated) {
            router.push('/login')
        }
    }, [isClient, isAuthenticated, router])

    if (!isClient) {
        return <p className="text-center py-8">Loading...</p>
    }

    if (!isAuthenticated) {
        return <p className="text-center py-8">Redirecting to login...</p>
    }

    if (loading) return <p className="text-center py-8">Loading course details...</p>
    if (error) return <p className="text-center py-8 text-red-500">Error: {error.message}</p>
    if (!data?.course) return <p className="text-center py-8">Course not found</p>

    return (
        <div className="container mx-auto px-4 py-8">
            <CourseDetail course={data.course} userRole={userRole as UserRole | null} />
        </div>
    )
}
