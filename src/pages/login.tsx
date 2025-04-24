import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/LoginForm'

export default function Login() {
    const router = useRouter()
    const { login } = useAuth()
    const [error, setError] = useState('')

    const handleLogin = (email: string, password: string) => {
        // Mock authentication - in a real app this would call an API
        // Providing mock users for testing
        const mockUsers = [
            { id: '1', name: 'Student User', email: 'student@example.com', password: 'password' },
            { id: '2', name: 'Professor User', email: 'professor@example.com', password: 'password' }
        ]

        const user = mockUsers.find(u => u.email === email && u.password === password)

        if (user) {
            // Remove password before storing
            const { password, ...userData } = user
            login(userData)
            router.push('/courses')
        } else {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <LoginForm onSubmit={handleLogin} />
            <div className="mt-4 text-sm text-gray-600">
                <p>For testing:</p>
                <p>Student: student@example.com / password</p>
                <p>Professor: professor@example.com / password</p>
            </div>
        </div>
    )
}
