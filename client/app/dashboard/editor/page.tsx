import Inputs from '@/components/Inputs'
import MarkdownEditor from '@/components/MarkdownEditor'
import { Button } from '@/components/ui/button'
import React from 'react'

const Editor = async () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='text-3xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        Editor
      </h1>
      <div className='w-[80%] pb-[60px]'>
        <h2 className='text-xl pt-2 pb-8 font-bold text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text text-center'>Sketch your crime story:</h2>
        <MarkdownEditor/>
      </div>
      <Inputs/>
      <Button className='mt-2 mb-6 w-[20%]'>Submit</Button>
    </div>
  )
}

export default Editor