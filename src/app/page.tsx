import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { Suspense } from 'react'
import { redirect } from "next/navigation";
import Gallery from "@/components/Galery";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { list } from '@vercel/blob'
import ImageList from "@/components/imageList";


export default async function Home() {

  const { blobs } = await list()
  console.log({ blobs })

  const session = await getServerSession(authOptions)

  !session ? redirect('/login') : null


  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="">

          <Navbar />
          <div className="mx-auto p-6">
            <div className="flex justify-between">
              <h1 className="font-semibold text-2xl">
                hallo <span className="text-primary">{String(session?.user?.name).toLowerCase()}</span>
              </h1>

              <div className="hidden md:block" >
                <Button size='lg' color="primary" className="">
                  <Link href="/upload">Upload</Link>
                </Button>
              </div>
            </div>
          </div>

          {blobs.length == 0 && (
            <div className="mx-auto mt-2 p-20 ">
              <div>
                <h1 className="text-center">No image found</h1>
                <Link href="/upload" className="">
                  <Button size="sm" className="w-full h-10 mt-5" color="primary">
                    Upload dulu sini :)
                  </Button>
                </Link>
              </div>
            </div>)}

            <div className="columns-2 my-2 md:columns-3 lg:columns-5 xl:columns-6 p-5">
            <div className="">
            {blobs.map(blob => (
                <div className="mb-4 grid">
                  <ImageList url={blob.url} />
                </div>
            ))}</div>
          </div>

          {/* <div className="mt-0">
            <Gallery userDir={String(session?.user?.email!)} />
          </div> */}
        </main >
      </Suspense >
    </>

  )


}

