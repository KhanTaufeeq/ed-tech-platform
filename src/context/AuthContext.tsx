// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type User = {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (userData: User) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        // Check if user data exists in localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
            setIsAuthenticated(true)
        }
    }, [])

    const login = (userData: User) => {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
