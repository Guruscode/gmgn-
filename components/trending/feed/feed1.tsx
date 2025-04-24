"use client";
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import SingleFeed from '../../common/utils/singleFeed'
import { fetchMemeCoinData } from '@/lib/utils'
import { memeCoins, memeCoinsInterface } from '@/lib/faker-data'
import { Skeleton } from "@/components/ui/skeleton"

export default function Feed1() {
    const [memeData, setMemeData] = useState<memeCoinsInterface[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetchMemeCoinData(memeCoins).then((data) => {
            setLoading(false)
            setMemeData(data)
        })
    }, [])

    return (
        <div className='w-full max-h-[787px] bg-accent-2  pb-5 rounded-lg pt-2'>
            <div className="flex items-center p-4 w-full justify-between">
                <div className="text-[14px] font-[600]">🌱 New Pool</div>

                <Popover>
                    <PopoverTrigger asChild>
                        <div className="text-[14px] flex gap-2 cursor-pointer  items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#6E727D" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                            Filter
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Dimensions</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="width">Width</label>
                                    <input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxWidth">Max. width</label>
                                    <input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="height">Height</label>
                                    <input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <label htmlFor="maxHeight">Max. height</label>
                                    <input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="overflow-y-auto h-full">

                {
                    isLoading ?
                        <div className="px-4 mt-5 space-y-2">
                            {
                                Array(10).fill(0).map((_, index) => (
                                    <Skeleton className='w-full h-[80px]' key={index} />
                                ))
                            }
                        </div>
                        :
                        memeData.map((data, i) => (
                            <SingleFeed memeData={data} key={i} />
                        ))
                }
            </div>
        </div>
    )
}
