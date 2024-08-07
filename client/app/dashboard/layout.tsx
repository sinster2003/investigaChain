import AuthButton from '@/components/AuthButton'
import ConnectWallet from '@/components/ConnectWallet'
import Maximize from '@/components/ui/Maximize'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <div className='bg-background border-b-[1px] border-secondary h-10 flex items-center justify-between py-6 w-full fixed z-50'>
            <div className='flex gap-2 px-10 items-center'>
                <Image src='/close.png' alt='close' width={20} height={20}/>
                <Maximize/>
            </div>
            <div className='px-4 flex gap-4'>
                <ConnectWallet/>
                <AuthButton/>
            </div>
        </div>
        <div className='flex justify-between pt-[48px]'>
            <div className='h-screen border-r-[1px] border-secondary w-10 flex flex-col gap-6 items-center px-2 py-6 fixed z-50'>
                <Link href='/dashboard/'><Image src='/welcome.png' alt='welcome' width={24} height={24}/></Link>
                <Link href='/dashboard/stories'><Image src='/stories.png' alt='stories' width={24} height={24}/></Link>
                <Link href='/dashboard/search'><Image src='/glass.png' alt='search' width={24} height={24}/></Link>
                <Link href='/dashboard/editor'><Image src='/edit.png' alt='upload' width={24} height={24}/></Link>
                <Link href='/dashboard/patterns'><Image src='/patterns.png' alt='patterns' width={24} height={24}/></Link>
            </div>
            <div className='flex w-full justify-center px-20'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Dashboard