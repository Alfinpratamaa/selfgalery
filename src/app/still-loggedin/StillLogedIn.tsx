'use client'
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link'

const UserStillLoggedIn = () => {

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/',
        })


    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">You haven't logged out before.</h1>
            <p className="text-lg text-gray-600 mb-8">Please logout first.</p>
            <div className='flex flex-col justify-center mx-auto'>
                <Button size={'default'} color='primary' onClick={handleLogout}>
                    Logout
                </Button>
                <p className='mt-2 mb-2'>or back to home</p>
                <Link href='/'>
                    <div className='mx-auto justify-center'>
                        <Button size={'default'} variant='ghost'  >
                        Home
                    </Button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserStillLoggedIn;