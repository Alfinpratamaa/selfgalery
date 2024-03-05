import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const UserStillLoggedIn = () => {

    const session = getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    const handleLogout = async () => {
        await signOut()
        redirect('/login')
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
                <Button size={'sm'} color='green' onClick={() => redirect('/')}>
                    Home
                </Button>
            </div>
        </div>
    );
};

export default UserStillLoggedIn;