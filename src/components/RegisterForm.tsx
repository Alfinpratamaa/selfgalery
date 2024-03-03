"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { CreateUserInput, createUserSchema } from "@/models/user-schema";
import Link from "next/link";
import Image from "next/image";
import axios from 'axios'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from "next/navigation";
import { toast } from 'sonner'

const RegisterForm = () => {
    const router = useRouter();
    const { handleSubmit, register } = useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<CreateUserInput> = async (values) => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/register", values);
            console.log(res);
            toast.success('Account created successfully', { style: { backgroundColor: 'lightgreen' }, icon: '🚀', position: "top-center" })
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message, { style: { backgroundColor: 'red', color: 'white' }, position: "top-center" });
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit as any)}>
            <div className="flex flex-col  px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
                        Sign Up to your account
                    </h2>
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-2">
                        <div>
                            <Label htmlFor="name" className="block text-sm font-bold leading-6 text-primary">
                                Fullname
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="enter your name"
                                    {...register('name')}
                                    className="block w-full rounded-md border-0 py-1.5 text-primary shadow-sm ring-1 ring-inset p-2 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email" className="block text-sm font-bold leading-6 text-primary">
                                Email address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="enter your email"
                                    {...register('email')}
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
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="enter your password"
                                    {...register('password')}
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="cpassword" className="block text-sm font-bold leading-6 text-primary">
                                    Confirm Password
                                </Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    id="cpassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="confirm your password"
                                    {...register('passwordConfirm')}
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
                                {isLoading ? (
                                    <div className="flex">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> please wait...
                                    </div>
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold leading-6 text-primary hover:text-rose-400">
                            Login here
                        </Link>
                    </p>

                </div>
            </div>
        </form>
    );
};

export default RegisterForm;
