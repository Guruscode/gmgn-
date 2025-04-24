import React from 'react'
import FeedPane from './feed'

export default function Feed({switchTabs}) {
  return (
    <div className='grid grid-cols-3 px-[1.3rem] h-[781px] gap-5'>
        <FeedPane  whichFeed={"1"} switchTabs={switchTabs}/>
        <FeedPane  whichFeed={"2"} switchTabs={switchTabs}/>
        <FeedPane  whichFeed={"3"} switchTabs={switchTabs}/>
    </div>
  )
}
