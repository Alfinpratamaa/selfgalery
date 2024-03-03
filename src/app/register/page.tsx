
import { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';
import Navbar from '@/components/Navbar';






const page = async () => {
    const session = await getServerSession(authOptions);


    if (session) {
        redirect(`/profile`);
    }
    return (
        <>
            <Navbar />
            <section className='bg-ct-blue-600 min-h-screen '>
                <div className='container mx-auto px-6 h-full flex justify-center items-center'>
                    <div className='md:w-8/12 lg:w-5/12 bg-white px-8 py-4'>
                        <Suspense fallback={<>Loading...</>}>
                            <RegisterForm />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page