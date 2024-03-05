'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AiOutlineDelete } from 'react-icons/ai';

// Interface for ImageListProps
interface ImageListProps {
    url: string;
}

// ImageList component
const ImageList = ({ url }: ImageListProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false);

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

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div>
            <section>
                <div>
                    <Link key={url} href={url} target="_blank">
                        <div
                            className={`relative group ${isMobile ? 'cursor-pointer' : 'hover:shadow-md'}`}
                            onClick={isMobile ? handleToggleOptions : undefined}
                        >
                            <img
                                src={url}
                                className={`h-auto max-w-full rounded-lg object-cover object-center ${isMobile ? 'filter brightness-75' : ''
                                    }`}
                            />
                            {isMobile && showOptions && (
                                <div className="absolute top-0 right-0 p-2">
                                    <Button
                                        size="sm"
                                        color="danger"
                                        className="rounded-full"
                                        onClick={() => {
                                            // Handle delete action here
                                            console.log('Delete action');
                                        }}
                                    >
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
                        <Button
                            size="lg"
                            color="primary"
                            className="rounded-full text-lg"
                            onClick={handleToggleOptions}
                        >
                            &#8226;&#8226;&#8226; {/* Use the horizontal ellipsis character */}
                        </Button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ImageList;
