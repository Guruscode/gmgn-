import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

export default function UtilityBar({switchTabs, setTabSwitch}) {
    return (
        <div className='md:px-[1.3rem] px-[.5rem] py-[1rem] flex gap-2 flex-col md:flex-row justify-between md:items-center'>
            <div className="flex gap-2 items-center">
                <button onClick={() => setTabSwitch("holding")} className={`text-[12px] font-[500] duration-200 ${switchTabs == "holding" ? "bg-accent-buttonBg dark:text-white" : "text-accent-aux-1 bg-accent-search"} rounded-[8px] h-[28px] px-[12px]`}>Holding</button>
                <button onClick={() => setTabSwitch("limit")}  className={`text-[12px] font-[500] duration-200 ${switchTabs == "limit" ? "bg-accent-buttonBg dark:text-white" : "text-accent-aux-1 bg-accent-search"} rounded-[8px] h-[28px] px-[12px]`}>Limit</button>
                <button  onClick={() => setTabSwitch("strategy")} className={`text-[12px] font-[500] duration-200 ${switchTabs == "strategy" ? "bg-accent-buttonBg dark:text-white" : "text-accent-aux-1 bg-accent-search"} rounded-[8px] h-[28px] px-[12px]`}>Strategy</button>
            </div>


            <div className=" flex items-center gap-[8px]">
                <div className="flex items-center md:text-[12px] text-[11px] leading-[1] gap-1">
                    <Checkbox id='hide-low'/>
                    <label className='cursor-pointer' htmlFor='hide-low'>Hide Low Liq/Honeypot</label>
                </div>

                <div className="flex items-center md:text-[12px] text-[11px] leading-[1] gap-1">
                    <Checkbox id='hide-small' defaultChecked={true}/>
                    <label className='cursor-pointer' htmlFor='hide-small'>Hide Small Asset</label>
                </div>

                <div className="flex items-center md:text-[12px] text-[11px] leading-[1] gap-1">
                    <Checkbox id='hide-sell' defaultChecked={true}/>
                    <label className='cursor-pointer' htmlFor='hide-sell'>Hide Sell Out</label>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <div className='outline-none h-[35px] w-[35px] flex justify-center items-center rounded-md text-accent-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.652 2.05a2.75 2.75 0 012.696 0l4.977 2.8a2.75 2.75 0 011.402 2.397v5.51a2.75 2.75 0 01-1.402 2.397l-4.977 2.8a2.75 2.75 0 01-2.696 0l-4.978-2.8a2.75 2.75 0 01-1.402-2.397v-5.51c0-.994.536-1.91 1.402-2.397l4.978-2.8zm1.96 1.308a1.25 1.25 0 00-1.225 0l-4.977 2.8a1.25 1.25 0 00-.638 1.089v5.51c0 .451.244.868.638 1.09l4.977 2.799c.38.214.845.214 1.226 0l4.977-2.8a1.25 1.25 0 00.637-1.09v-5.51a1.25 1.25 0 00-.637-1.089l-4.977-2.8z"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 8.133a1.866 1.866 0 100 3.733 1.866 1.866 0 000-3.733zM6.634 9.999a3.366 3.366 0 116.733 0 3.366 3.366 0 01-6.733 0z"></path>
                            </svg>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
