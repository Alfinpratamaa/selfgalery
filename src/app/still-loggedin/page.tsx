'use client'
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const UserStillLoggedIn = () => {
    const router = useRouter()

    const { data: session } = useSession()

    if (!session) {
        router.push('/login')
    }

    const handleLogout = async () => {
        await signOut({
            redirect: false,
            callbackUrl: '/'
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">You haven't logged out before.</h1>
            <p className="text-lg text-gray-600 mb-8">Please logout first.</p>
            <div className='flex flex-col justify-center mx-auto'>
                <Button size={'sm'} color='primary' onClick={handleLogout}>
                    Logout
                </Button>
                <p>or back to home</p>
                <Link href='/'>
                    <Button size={'sm'} color='green' >
                    Home
                </Button>
                </Link>
            </div>
        </div>
    );
};

export default UserStillLoggedIn;