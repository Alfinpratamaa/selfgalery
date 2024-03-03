'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

interface ProfileProps {
    name?: string
    email?: string
    image?: string
}

const Profile = ({ name, email, image }: ProfileProps) => {

    const router = useRouter()
    const { data: sessions, status } = useSession()



    return (
        <div>
            <p className="mb-3 text-2xl text-center font-semibold">
                Profile Page
            </p>
            <div className="flex items-center gap-8">
                <div>
                    <Image
                        src={image || "/img-src/default.png"}
                        alt={`profile photo of ${sessions?.user?.name}`}
                        width={90}
                        height={90}
                    />
                </div>
                <div className="mt-8">
                    <p className="mb-3">Name: {name || 'name'}</p>
                    <p className="mb-3">Email: {email || 'email@example.com'}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile