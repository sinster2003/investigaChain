import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'
import Image from 'next/image';

interface StoryProps {
    title: string;
    content: string;
    tags: string[];
}

const StoryCard = ({ title, content, tags }: StoryProps) => {
  return (
    <div>
        <Card className='w-[350px] h-[400px]'>
            <CardTitle className='py-6 text-center'>
                {title.length > 30 ? `${title.slice(0, 25)}...` : title}
            </CardTitle>
            <CardContent className='flex flex-col gap-2 items-center'>
                <div className='w-full'>
                    <Image src='' alt='thumbnail' objectFit='cover'/>
                </div>
                <div>{content.length > 30 ? `${content.slice(0, 25)}...` : content}</div>
            </CardContent>
            <CardFooter className='flex gap-2 flex-wrap justify-center'>
                {tags.map((tag, index) => <div key={index} className='bg-secondary w-fit py-2 px-4 rounded-full'>
                    {tag.length > 8 ? `${tag.slice(0,5)}...` : tag}
                </div>)}
            </CardFooter>
        </Card>
    </div>
  )
}

export default StoryCard