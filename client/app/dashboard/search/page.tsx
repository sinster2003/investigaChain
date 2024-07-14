import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col items-center w-full justify-center'>
      <h1 className='text-3xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        Search
      </h1>
      <div className='flex w-full justify-center'>
        <div className='relative w-[40%]'>
          <SearchIcon className='absolute left-10 top-1/2 -translate-y-1/2'/>
          <input className='pl-[100px] w-full h-20 rounded-full outline-none'/>
        </div>
      </div>
    </div>
  )
}

export default Search