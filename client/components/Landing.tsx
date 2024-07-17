import Image from 'next/image'
import React from 'react'
import ContributeButton from './ContributeButton'

const Landing = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='text-4xl font-bold py-10 text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text'>
        Welcome To InvestigaChain
      </h1>
      <div className='w-[80%] pt-[60px] flex gap-20'>
        <div className='flex flex-col w-[58%] justify-between'>
            <div className='flex flex-col gap-6'>
                <h1 className='text-4xl font-bold'>Connecting Dots, Finding Answers: Your Tool for Crime Pattern Analysis</h1>
                <p>At Investigation, we believe in the power of patterns. Our decentralized web application revolutionizes crime research by harnessing the collective intelligence of our community. Users can contribute stories and data points, building patterns all the way through. Whether you are a researcher, law enforcement professional, or citizen investigator, our platform equips you with the tools to uncover patterns, identify trends, and contribute meaningfully to crime analysis. Join us in rewriting the narrative of investigation through decentralized, data-driven insights.</p>
              </div>
            <ContributeButton />
        </div>
        <div className='relative'>
          <Image src='/landing.jpeg' alt='landing-image' className='rounded-2xl -rotate-12' width={400} height={400}/>
          <Image src='/pin.png' alt='pin' width={60} height={60} className='absolute -top-10 right-10'/>
        </div>
      </div>
    </div>
  )
}

export default Landing