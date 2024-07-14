"use client"

import MDEditor, { commands } from '@uiw/react-md-editor';
import { useState } from 'react'

const MarkdownEditor = () => {
  const [value, setValue] = useState("**Hello World**");
  
  return (
    <div className="w-full flex justify-center">
      <MDEditor 
        value={value} 
        onChange={(val) => setValue(val || "")}
        commands={[
          commands.bold,
          commands.italic,
          commands.divider,
          commands.title,
          commands.title2,
          commands.title3,
          commands.divider,
          commands.link,
          commands.quote,
          commands.orderedListCommand,
          commands.unorderedListCommand,
          commands.strikethrough,
          commands.table,
        ]}

        style={{
          minWidth: "100%",
          minHeight: "70vh"
        }}
      />
    </div>
  )
}

export default MarkdownEditor