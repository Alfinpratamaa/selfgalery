import UserStillLoggedIn from './StillLogedIn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'



export default async function page() {
    const session = await getServerSession(authOptions)
    !session ? redirect('/login') : null

    return (
       <div>
            <Navbar />
           <UserStillLoggedIn />
       </div>
   );
}