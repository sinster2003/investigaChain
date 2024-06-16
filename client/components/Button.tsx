"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const Button = () => {
  const session = useSession();

  return (
    <div>
        <p>Session: {JSON.stringify(session)}</p>
        <button onClick={() => signIn()}>Button</button>
    </div>
  )
}

export default Button