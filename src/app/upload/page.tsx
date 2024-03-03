import React, { Suspense } from 'react';
import UploadForm from '@/components/UploadForm';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function UploadPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/login');
    }

    return (
        <section>
            <Suspense fallback={<>Loading...</>}>
                <UploadForm />
            </Suspense>
        </section>
    )
}