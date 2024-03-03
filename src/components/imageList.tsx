'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ImageListProps {
    url: string;

}

const ImageList = ({ url }: ImageListProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
            };

            // Initial check on mount
            handleResize();

            // Event listener for window resize
            window.addEventListener('resize', handleResize);

            // Cleanup the event listener on component unmount
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);
    return (
        <div>
            <section >
                <div>
                    <Link key={url} href={url} target="_blank">
                        <div className="relative group">
                            <img src={url} className="h-auto max-w-full rounded-lg object-cover object-center" />
                        </div>
                    </Link>
                </div>

                {isMobile && (
                    <div className="fixed bottom-6 right-6">
                        {/* Your flying button content goes here */}
                        <Link href='/upload'>
                            <Button size="icon" color="primary" className='rounded-full text-lg'>
                                +
                            </Button>
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ImageList;
