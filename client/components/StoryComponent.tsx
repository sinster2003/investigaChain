"use client"

import MDEditor from '@uiw/react-md-editor'

const StoryComponent = ({ content }: { content: string }) => {
  return (
    <div className='w-[80%] text-justify'>
      <MDEditor.Markdown source={content} className='p-20'/>
    </div>
  )
}

export default StoryComponent