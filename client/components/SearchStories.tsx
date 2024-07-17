"use client"

import axios from 'axios';
import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import StoryCard from './StoryCard';

const SearchStories = () => {
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    let prevId;
    clearTimeout(prevId);

    async function getFilteredStories() {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/story/getfilters?filter=${value}`);
        const result = await response.data;
        setFiltered(result)
    }

    prevId = setTimeout(() => {
        getFilteredStories();
    }, 1000);

    return () => {
        clearTimeout(prevId);
    }
  } , [value]);

  console.log("value: ", value);
  console.log(filtered);

  return (
    <div className='flex flex-col w-full justify-center items-center gap-20'>
      <div className='relative w-[40%] text-center'>
        <SearchIcon className='absolute left-10 top-1/2 -translate-y-1/2'/>
        <input value={value} className='pl-[100px] w-full h-20 rounded-full outline-none' onChange={(e) => setValue(e.target.value)}/>
      </div>
      <div className='flex gap-8 flex-wrap items-center justify-center pb-10'>
        {filtered.length > 0 &&
          filtered.map((filter: any) => <StoryCard key={filter.id} id={filter.id} title={filter.title} description={filter.description} tags={filter.keywords}/>)
        }
      </div>
    </div>
  )
}

export default SearchStories