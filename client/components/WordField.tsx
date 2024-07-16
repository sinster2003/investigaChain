"use client"

import { Button } from './ui/button'
import { useRecoilState } from 'recoil';
import { editorAtom } from '@/state/editor';
import { useEffect, useState } from 'react';

const WordField = ({ title, type, label }: { title: string, type: string, label: string }) => {
  const [editorState, setEditorState] = useRecoilState(editorAtom);
  const [inputElement, setInputElement] = useState<string>('');
  const [ssr, setSsr] = useState(true);

  // when mounted it is on the client
  useEffect(() => {
    setSsr(false);
  }, []);
  
  const tags = (!ssr ? (label === "keywords" ? editorState.keywords as string[]: editorState.references as string[]) : []);

  return(
    <div className="w-[80%] py-6">
      <h2 className="text-lg pb-2">{title}</h2>
      <div className="w-full flex justify-between">
        <input value={inputElement} className="w-[89%] h-10 rounded-lg outline-primary px-4" onChange={(e) => setInputElement(e.target.value)}/>
        <Button className="w-[10%] inline-block" onClick={() => {
          if(inputElement && typeof inputElement === "string") {
            if((type === "url" && inputElement.startsWith("http" || "https")) || type === "tags") {
              setEditorState({...editorState, [label]: tags.concat(inputElement)});
              setInputElement('');
            }
          }
        }}>
          Add
        </Button>
      </div>
      <div className='pt-4 flex gap-2 flex-wrap'>
          {tags.map((tag, index) => <div key={index} className='bg-secondary w-fit py-2 px-4 rounded-full'>
            {tag}
          </div>)}
      </div>
    </div>
  )
}

export default WordField