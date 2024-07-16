import StoryComponent from '@/components/StoryComponent'
import Link from 'next/link';

const getStory = async (storyId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/users/getstory/${storyId}`);
    const story = await response.json();
    return story;
  }
  catch(error) {
    console.log(error);
  }
}
 
const StoryPage = async ({ params }: { params: { storyId: string }}) => {  
  const { story } = await getStory(params.storyId);

  return (
    <div className='flex flex-col items-center gap-[65px]'>
      <h1 className='text-3xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        {story?.title}
      </h1>

      <StoryComponent content={story.content}/>

      <div className='flex flex-col w-[80%]'>
        <h2 className='text-xl pt-2 pb-6 font-bold text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text text-center self-center'>Keywords</h2>
        <div className='flex gap-4 justify-center flex-wrap'>
          {story?.keywords?.map((keyword: string, index: number) => <div key={index} className='flex justify-center items-center text-center flex-wrap bg-secondary min-w-[150px] leading-10 py-2 px-6 rounded-full'>
            {keyword}
          </div>)}
        </div>
      </div>

      <div className='flex flex-col w-[80%] mb-20'>
        <h2 className='text-xl pt-2 pb-6 font-bold text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text text-center self-center'>References</h2>
        <ul>
          {story?.references?.map((reference: string, index: number) => <li key={index} className='flex flex-col text-blue-400 list-disc'>
            <Link href={`${reference}`} target='_blank'>{reference}</Link>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default StoryPage