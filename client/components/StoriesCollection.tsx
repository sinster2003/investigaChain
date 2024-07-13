"use client"

import axios from 'axios'
import StoryCard from './StoryCard'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const StoriesCollection = () => {
  const session = useSession();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getStories = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/getallstories`);
      const stories = await response.data;
      setStories(stories);
    }

    getStories();
  }, []);

  return (
    <div className='flex gap-8 flex-wrap items-center justify-center'>
      {stories.length > 0 && stories.map((story: any) => <StoryCard key={story.id} title={story.title} content={story.content}/>)}
    </div>
  )
}

export default StoriesCollection