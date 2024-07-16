"use client"

import MDEditor, { commands } from '@uiw/react-md-editor';
import { editorAtom } from '@/state/editor';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

const MarkdownEditor = () => {
  const [editorState, setEditorState] = useRecoilState(editorAtom);
  const [ssr, setSsr] = useState(true);

  // when the app is on client side then we retrieve the recoil state
  useEffect(() => {
    setSsr(false);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <MDEditor 
        value={!ssr ? editorState.content: ""} 
        onChange={(val) => {
          setEditorState({...editorState, content: val || ""})
        }}
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