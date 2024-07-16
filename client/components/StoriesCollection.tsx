import axios from 'axios'
import StoryCard from './StoryCard'

const getStories = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/users/getallstories`);
  const stories = await response.data;
  return stories;
}

const StoriesCollection = async () => {
  const stories = await getStories();

  return (
    <div className='flex gap-8 flex-wrap items-center justify-center pb-10'>
      {stories.length > 0 && stories.map((story: any) => <StoryCard key={story.id} title={story.title} description={story.description} tags={story.keywords}/>)}
    </div>
  )
}

export default StoriesCollection