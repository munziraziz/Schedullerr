import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Usermenu from './User-menu'
import { checkUser } from '@/lib/checkUser'

const Header = async () => {


  const user = await checkUser();

  return (
    <nav className="mx-auto px-4 flex justify-between py-2 items-center shadow-md border-b-2">
      <Link href={"/"} className='flex items-center '>
        <Image src="/logo1.png" width="150" height="60" alt='Scheduler' className='h-16 w-auto' />
      </Link>

      <div className='py-4 flex items-center gap-3'>
        <Link href="/events?create=true"><Button className="flex items-center gap-2"><PenBox size={18} /> Create Event</Button></Link>
        <SignedOut>
          <SignInButton forceRedirectUrl='/dashboard'>
            <Button variant='outline' className="ml-4">Login</Button>
          </SignInButton>

        </SignedOut>
        <SignedIn>
          <Usermenu />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Header
