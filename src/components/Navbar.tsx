'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';
import { FiMenu } from 'react-icons/fi'
import { FiX } from 'react-icons/fi';
import { useAutoAnimate } from '@formkit/auto-animate/react'
// ... (previous imports)

export default function Navbar() {
    const [animationParent] = useAutoAnimate()
    const links = [
        { href: '/upload', label: 'Upload Image' },
        { href: 'https://alfinpratamaa.github.io', label: 'MyBlog' },
        { href: '/profile', label: 'Profile' },
    ];

    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: '/',
        });
    };

    const { data: session, status } = useSession();
    const user = session?.user;

    // State to manage mobile navigation visibility
    const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
    const [mobileNavTransform, setMobileNavTransform] = useState<string>('translate-x-full')

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);

        setMobileNavTransform(isMobileNavOpen ? "translate-x-[-100%]" : "translate -X-0");
    };

    return (
        <nav ref={animationParent} className="flex trnas shadow-sm bg-base-100 text-primary items-center w-full p-4 justify-between text-lg">
            <div className="flex  mx-3 my-2">
                <Link href={'/'} className='text-2xl'>
                    {<h1 className='font-bold text-primary hover:text-rose-400 ease-in-out transition'>self<span className='text-slate-800'>Galery</span></h1>}
                </Link>
            </div>

            {/* Mobile navigation button */}
            <FiMenu className='cursor-pointer text-4xl md:hidden' onClick={toggleMobileNav} />

            {/* MobileNav component */}
            {isMobileNavOpen && (<div className="fixed left-0 top-0 w-full h-full bg-black/60 z-50"
                style={{ transform: mobileNavTransform }}>
                <MobileNav status={status} user={user} handleLogout={handleLogout} toggleMobileNav={toggleMobileNav} />
            </div>)}

            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-3 items-center">
                {links.map((link) => (
                    <ul className="px-2 " key={link.href}>
                        <li>
                            <Link href={link.href} >
                                <Button variant={'link'}>
                                    {link.label}
                                </Button>
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>

            <div className="hidden md:flex items-center justify-center my-auto">
                {status === 'loading' ? (
                    <Skeleton width={80} height={24} />
                ) : !user ? (
                    <Link className="btn" href={'/login'}>
                        <Button variant='outline' color='blue' className='font-serif'>
                            Login
                        </Button>
                    </Link>
                ) : (
                    <Button onClick={handleLogout} color="red">
                        Logout
                    </Button>
                )}
            </div>
        </nav>
    );
}

// ... (previous MobileNav component)

interface MobileNavProps {
    status: string,
    user: any;
    handleLogout: () => void;
    toggleMobileNav: () => void;
}

const MobileNav = ({ status, user, handleLogout, toggleMobileNav }: MobileNavProps) => {

    const links = [
        { href: '/', label: 'Home' },
        { href: '/upload', label: 'Upload Image' },
        { href: 'https://alfinpratamaa.github.io', label: 'MyBlog' },
        { href: '/profile', label: 'Profile' },
    ];
    return (
        <div className='fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden'>
            <div className='h-full w-[65%] bg-white px-4 py-4'>
                <section className='flex justify-end'>
                    <FiX className='text-4xl cursor-pointer' onClick={toggleMobileNav} />
                </section>

                <div className="flex flex-col space-y-3 text-sm justify-center mx-auto items-center mt-4">
                    {links.map((link) => (
                        <Link href={link.href} key={link.href}>
                            <ul className="px-2 " key={link.href}>
                                <li>
                                    <Link href={link.href} >
                                        <Button variant={'link'}>
                                            {link.label}
                                        </Button>
                                    </Link>
                                </li>
                            </ul>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center justify-center my-auto mt-4">
                    {status === 'loading' ? (
                        <Skeleton width={80} height={24} />
                    ) : !user ? (
                        <div className='flex flex-col gap-2 items-center justify-center'>

                            <Link href={'/login'}>
                                <Button variant='outline' color='blue' className='font-serif'>
                                    Login
                                </Button>
                            </Link>
                            <Link href={'/register'}>
                                <Button color='blue' className='font-serif'>
                                    Register
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Button onClick={handleLogout} color="red">
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ... (remaining code)


// ... (remaining code)
