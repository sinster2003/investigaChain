import MarkdownEditor from '@/components/MarkdownEditor'
import React from 'react'

const Editor = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='text-3xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        Editor
      </h1>
      <MarkdownEditor/>
    </div>
  )
}

export default Editor