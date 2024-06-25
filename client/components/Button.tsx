"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Button = () => {
  const session = useSession();

  return (
    <div>
        <p>Session: {JSON.stringify(session)}</p>
        <button onClick={() => signIn()}>Button</button>
        <button onClick={() => signOut()}>Signout</button>
    </div>
  )
}

export default Button