import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    EdTech Platform
                </Link>
                <div>
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/courses" className="hover:underline">
                                Courses
                            </Link>
                            <span>|</span>
                            <span>{user?.name}</span>
                            <button
                                onClick={logout}
                                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
