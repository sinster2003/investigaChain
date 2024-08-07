"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editorAtom } from '@/state/editor'
import { metamaskAtom } from '@/state/metamask'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import axios from 'axios'
import { BrowserProvider, ethers } from 'ethers'

interface AccessSession extends Session {
  accessToken?: string;
}

export type AccessSessionType = AccessSession | null

const EditorButton = () => {
  const [editorState, setEditorState] = useRecoilState(editorAtom);
  const metamask = useRecoilValue(metamaskAtom);

  const session = useSession();
  const router = useRouter();
  const sessionData: AccessSessionType = session?.data;
  
  if(session && session.status === "unauthenticated") {
    router.push('/api/auth/signin');
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/story/uploadstory`,
        {
          ...editorState,
          metamask
        }, 
        {
          headers: {
            'Authorization': sessionData?.accessToken || ""
          }
        }
      );

      const result = await response.data;

      // check metamask address if persists & ethereum is injected?
      if(metamask && window.ethereum) {
        try {
          const populatedProvider = new ethers.BrowserProvider(window.ethereum)
          
          // user signs the contract
          const signer = await populatedProvider.getSigner();
          const contract = new ethers.Contract(result.contract.target, result.contract.interface.fragments, signer);
          
          // send the unsigned tx after signing to blockchain
          await signer.sendTransaction(result?.unsignedTx);
          console.log("Successful Transaction");
          
          // handle event of adding story
          contract?.on("StoryAdded", (data) => {
            console.log(data.storyId);
          });

          // the form to the original state after successful transaction
          setEditorState({
            title: "",
            description: "",
            content: "",
            keywords: [],
            references: []
          });
        }
        catch(error) {
          console.log(error);
          console.log("Unsuccessful Transaction");
        }
      }
      else  {
        console.log("Connect to a metamask wallet");
      }
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