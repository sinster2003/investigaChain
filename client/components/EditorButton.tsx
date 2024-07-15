"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRecoilValue } from 'recoil'
import { editorAtom } from '@/state/editor'
import { metamaskAtom } from '@/state/metamask'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const EditorButton = () => {
  const { title, description, content, keywords, references } = useRecoilValue(editorAtom);
  const metamask = useRecoilValue(metamaskAtom);

  const session = useSession();
  const router = useRouter();

  if(session && session.status === "unauthenticated") {
    router.push('/api/auth/signin');
  }
  
  const handleSubmit = async () => {
    console.log(session.data.accessToken)
    try {
      const response = await axios.post('http://localhost:3001/api/users/uploadstory', 
        {
          headers: {
            'Authorization': session.data.accessToken
          }
        },
        {
          title,
          description,
          content,
          keywords,
          references,
          metamask
        }
      );

      const result = await response.data;
      console.log(result);
    }
    catch(error) {
      console.log(error);
    }
  }

    return (
        <Button className='mt-2 mb-6 w-[20%]' onClick={() => handleSubmit()}>
            Submit
        </Button>
    )
}

export default EditorButton