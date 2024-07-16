"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';

const AuthButton = () => {
  const session = useSession();

  return (
    <div>
      {
        session.status === "loading" ?
        <Button variant="ghost" disabled>
          <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
          Loading
        </Button> :
        session.status !== "authenticated" ?
        <Button variant="ghost" onClick={() => signIn()}>
          Sign in
        </Button> :
        <Button variant="ghost" onClick={() => signOut()}>
          Logout
        </Button>
      }
    </div>
  )
}

export default AuthButton