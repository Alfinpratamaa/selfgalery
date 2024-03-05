import UserStillLoggedIn from './StillLogedIn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'



export default async function page() {
    const session = await getServerSession(authOptions)
    !session ? redirect('/login') : null

    return (
       <div>
           <UserStillLoggedIn />
       </div>
   );
}