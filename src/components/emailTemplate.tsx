import * as React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
interface EmailTemplateProps {
    name: string;
    token: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name, token
}) => (
    <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Hello, {name}!</h1>
            <p className="text-gray-600 mb-4">Kindly verify your account by clicking the button below.</p>
            <Button size={'lg'}>
                <a href={`${process.env.DOMAIN_URL}/api/verify/${token}`}>
                    Verify Account
                </a>
            </Button>
        </div>
    </div>
);

export default EmailTemplate;
