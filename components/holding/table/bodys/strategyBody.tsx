import Image from 'next/image'
import React from 'react'

export default function StrategyBody() {
    return (
        <div className="w-full absolute h-[250px] bg-accent-2 flex items-center justify-center">
            <div className=" flex flex-col items-center gap-1">
                <Image src={"/nodata.svg"} width={70} height={70} alt='no data' />
                <p className='text-accent-aux-1'>No Data</p>
            </div>
        </div>
    )
}
