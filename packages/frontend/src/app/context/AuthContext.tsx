'use client'
import { createContext, useEffect, useState } from "react";
import { getUserInformation, signInRequest } from "../services/auth";
import {setCookie, parseCookies} from 'nookies'
import {useRouter} from 'next/navigation'
import { ReactNode } from "react";

type AuthContextType = {
    user: UserType | null;
    isAuthenticated: boolean
    signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
    email: string,
    password: string
}

type UserType = {
    email: string;
    name: string;
    avatar_url: string
}
export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: { children: ReactNode }) {
    const router = useRouter()
    const [user, setUser] = useState<UserType | null>(null)
    const isAuthenticated = !!user

    useEffect(() => {
        const { 'token-lms': token } = parseCookies()
        if (token) {
            getUserInformation().then(response => {
                setUser(response.user)
            })
        }
    }, [])
    async function signIn({email, password}: SignInData) {
        const {token, user} = await signInRequest({
            email, password
        })

        setCookie(undefined, 'token-lms', token, {
            maxAge: 60*60*1 // 1 Hour
        })

        setUser(user)
        router.push('/dashboard')
        console.log(user)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider> 
    )
}