// pages/verification-success.js

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const VerificationSuccess = async () => {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-green-200 p-8 rounded-md shadow-lg">
                <div className="flex items-center justify-center mb-4">
                    <AiOutlineCheckCircle className="w-8 h-8 text-green-600 mr-2" />
                    <h2 className="text-2xl font-bold text-green-800">Verification Success</h2>
                </div>
                <p className="text-gray-700">
                    Your account has been successfully verified. You can now enjoy our services.
                </p>
                <Link href="/">
                    <Button color='primary' className="mt-4 block text-center text-white ">
                        login here
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default VerificationSuccess;
