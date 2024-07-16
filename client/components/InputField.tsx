"use client"

import { useRecoilState } from "recoil";
import { editorAtom } from '@/state/editor';
import { useEffect, useState } from 'react';

const InputField = ({ title, label }: { title: string, label: string }) => {
  const [editorState, setEditorState] = useRecoilState(editorAtom);
  const [ssr, setSsr] = useState(true);

  // when mounted it is on the client, activates recoil state
  useEffect(() => {
    setSsr(false);
  }, []);

  return(
    <div className="w-[80%] py-6">
      <h2 className="text-lg pb-2">{title}</h2>
      <input className="w-full h-10 rounded-lg outline-primary px-4" value={!ssr ? (label === "title" ? editorState.title: editorState.description): ""} onChange={(e) => {
        setEditorState({...editorState, [label]: e.target.value});
      }}/>
    </div>
  )
}

export default InputField