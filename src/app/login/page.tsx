import Navigation from '@/components/Navbar';
import LoginForm from '@/components/LoginForm';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
export default async function LoginPage() {
    const session = await getServerSession(authOptions);


    if (session) {
        redirect(`/profile`);
    }
    return (
        <>
            <section>
                <Navbar />
                <div className='container mx-auto px-6 h-full flex justify-center items-center'>
                    <div className='md:w-8/12 lg:w-5/12 bg-white px-8 py-2'>
                        <Suspense fallback={<>Loading...</>}>
                            <LoginForm />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    );
}
