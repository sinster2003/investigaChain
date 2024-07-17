import React from 'react'
import SearchStories from '@/components/SearchStories'

const Search = () => {
  return (
    <div className='flex flex-col items-center w-full justify-center'>
      <h1 className='text-3xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        Search
      </h1>
      <SearchStories/>
    </div>
  )
}

export default Search