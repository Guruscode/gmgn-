import React from 'react'
import Feed1 from './feed1'
import Feed2 from './feed2'
import Feed3 from './feed3'

export default function Feed() {
  return (
    <div className='grid grid-cols-3 px-[1.3rem] h-[781px] gap-5'>
        <Feed1 />
        <Feed2 />
        <Feed3 />
    </div>
  )
}
