
import Profile from "@/components/Profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Navbar from '@/components/Navbar';
export default async function ProfilePage() {

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect(`/login`)
    }
    return (
        <>
            <Navbar />
            <section className="bg-ct-blue-600 pt-5">
                <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md  justify-center items-center">
                    <div className='md:w-8/12 lg:w-5/12 bg-white'>
                        <Suspense fallback={<>Loading...</>}>
                            <Profile name={session?.user?.name!} email={session?.user?.email!} image={session?.user?.image!} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </>
    );
}
