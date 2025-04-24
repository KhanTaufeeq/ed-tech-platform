import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Home() {
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        // If authenticated, redirect to courses page
        // Otherwise redirect to login page
        if (isAuthenticated) {
            router.push('/courses')
        } else {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    return <div>Redirecting...</div>
}
