import React from 'react'
import { Card, CardContent, CardTitle } from './ui/card'

interface StoryProps {
    title: string;
    content: string;
}

const StoryCard = ({ title, content }: StoryProps) => {
  return (
    <div>
        <Card className='w-[350px] h-[400px]'>
            <CardTitle>
                {title}
            </CardTitle>
            <CardContent>
                {content.length > 30 ? `${content.slice(0, 20)}...` : content}
            </CardContent>
        </Card>
    </div>
  )
}

export default StoryCard