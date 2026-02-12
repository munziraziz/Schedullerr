"use client"
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react'
import React from 'react'

const Usermenu = () => {
  return (
   <UserButton appearance={{
    elements:{
        avatarBox: "h-10 w-10 rounded-full",
    }
   }}>

    <UserButton.MenuItems>
        <UserButton.Link label='My Events' labelIcon={<ChartNoAxesGantt size={15} />} href='/events'/>
        <UserButton.Action label='manageAccount' />
    </UserButton.MenuItems>
   </UserButton>
  )
}

export default Usermenu
