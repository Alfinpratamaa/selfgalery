'use client'
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';



import type { PutBlobResult, list } from '@vercel/blob'

import { Button } from '@/components/ui/button';

type Props = {
    userDir?: string;
};

export default function Gallery({ userDir }: Props) {
    const [files, setFiles] = useState<Array<string>>([]);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const [blob, setBlob] = useState<PutBlobResult | null>(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get(`/api/uploads`);
                setFiles(res.data.body);
                console.log(res.data.body);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

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
        <>
            <section className="my-3 max-w-full xl:my-1 h-screen md:p-10 flex p-5 px-6 space-x-3 justify-center relative">
                {files.length == 0 && (
                    <div className="mx-auto mt-2 p-20 ">
                        <div>
                            <h1 className="text-center">No image found</h1>
                            <Link href="/upload" className="">
                                <Button size="sm" className="w-full h-10 mt-5" color="primary">
                                    Upload dulu sini :)
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
                {files.length > 0 && (
                    <div className="grid gap-4 grid-cols-1 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                        {files.map((file: string, index: number) => (
                            <Link key={file} href={`/images/${userDir}/${file}`} target="_blank" className="grid place-content-center mb-4 sm:mb-0">
                                <div className="relative group">
                                    <Image
                                        src={`/images/${userDir}/${file}` || ''}
                                        alt={file}
                                        width={300}
                                        height={300}
                                        layout="fixed"
                                        className="object-cover group-hover:opacity-75 transition duration-300 ease-in-out rounded-md cursor-pointer"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

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
        </>
    );
}

