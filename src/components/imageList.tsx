'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AiOutlineDelete } from 'react-icons/ai';
interface ImageListProps {
    url: string;
}

const ImageList = ({ url }: ImageListProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            handleResize();

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <section>
                <div>
                    <Link key={url} href={url} target="_blank">
                        <div
                            className="relative group"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={url}
                                className="h-auto max-w-full rounded-lg object-cover object-center"
                            />
                            {isHovered && (
                                <div className="absolute top-0 right-0 p-2">
                                    <Button size="sm" color="danger" className="rounded-full">
                                        <AiOutlineDelete size={20} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>

                {isMobile && (
                    <div className="fixed bottom-6 right-6">
                        {/* Your flying button content goes here */}
                        <Link href="/upload">
                            <Button size="lg" color="primary" className="rounded-full text-lg">
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
