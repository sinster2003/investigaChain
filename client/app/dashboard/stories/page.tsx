import StoriesCollection from '@/components/StoriesCollection'

const Stories = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        Stories
      </h1>
      <StoriesCollection/>
    </div>
  )
}

export default Stories