"use client"

import { useRecoilState } from "recoil";
import { editorAtom } from '@/state/editor';
import { useState } from "react";

const InputField = ({ title, label }: { title: string, label: string }) => {
  const [editorState, setEditorState] = useRecoilState(editorAtom);
  const [value, setValue] = useState("");

  return(
    <div className="w-[80%] py-6">
      <h2 className="text-lg pb-2">{title}</h2>
      <input className="w-full h-10 rounded-lg outline-primary px-4" value={value} onChange={(e) => {
        setValue(e.target.value);
        setEditorState({...editorState, label: e.target.value});
      }}/>
    </div>
  )
}

export default InputField