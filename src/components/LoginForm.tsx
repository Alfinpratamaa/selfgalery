'use client'

import Link from "next/link"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import axios from "axios"

const LoginForm = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()





    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        setIsLoading(true)
        const response = await signIn('credentials', {
            ...data,
            redirect: false,
        })

        try {

            console.log(response);
            if (response?.error) {
                toast.error(response.error)
                return null
            }

            toast.success('Login success')
            router.push('/')

        } catch (error: any) {

            setIsLoading(false)
            toast.error(error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }


    }
    return (
        <>
            <div className="flex flex-col  px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" action="#" method="POST" onSubmit={loginUser}>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-bold leading-6 text-primary">
                                Email address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="enter your email"
                                    value={data?.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset p-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="block text-sm font-bold leading-6 text-primary">
                                    Password
                                </Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="enter your password"
                                    value={data?.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                color="primary"
                                className="w-full px-4 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-sm focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                {isLoading ? <div className="flex">
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> please wait...
                                </div> : 'Sign in'}

                            </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Dont have an account ?{' '}
                        <Link href="/register" className="font-semibold leading-6 text-primary hover:text-rose-400">
                            Register here
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default LoginForm


