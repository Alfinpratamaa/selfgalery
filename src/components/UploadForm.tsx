'use client'
import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ReloadIcon } from '@radix-ui/react-icons'
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import type { PutBlobResult } from '@vercel/blob'

export default function UploadForm() {

    const router = useRouter()

    const inputFileRef = useRef<HTMLInputElement>(null)

    const [blob, setBlob] = useState<PutBlobResult | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { data: session } = useSession()

    if (!session) {
        router.push('/login')
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            console.log('uploading image...')

            if (!inputFileRef.current?.files) {
                throw new Error("No file selected");
            }



            const files = inputFileRef.current.files[0];

            const response = await fetch(
                `/api/images?filename=${files.name}`,
                {
                    method: 'POST',
                    body: files,
                },
            );

            const newBlob = (await response.json()) as PutBlobResult;

            setBlob(newBlob);

            toast.success('successfuly upload an image', { style: { backgroundColor: 'lightgreen', }, icon: '🚀', position: "top-center" })
            setIsLoading(false)
            router.push('/')
        } catch (error) {
            toast.error('failed uploading an image', { style: { backgroundColor: 'red', color: 'white' }, position: "top-center" })
            setIsLoading(false)
        }

    }

    return (
        <div>
            <Navbar />
            <form onSubmit={onSubmit}  >
                <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto px-4 py-10">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" ref={inputFileRef} onChange={(e) => setFile(e.target.files?.[0]!)} />
                    <Button className="mt-2" color="primary">{isLoading ? <div className="flex">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> please wait...
                    </div> : 'Upload'}</Button>
                </div >
            </form>

        </div>
    )
}