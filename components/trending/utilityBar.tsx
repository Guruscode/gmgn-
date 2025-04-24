'use client';
import React, { useCallback, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {  useSearchParams } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { updateUrlParams } from '@/lib/utils';



export default function UtilityBar({ setSwitch, switchTabs }) {
    const chain = useSearchParams()
    const [activeTimeFrame, setTimeFrame] = useState("1m")
    const getChain = useCallback(() => chain.get("chain"), [chain]);

    return (
        <div className='md:px-[1.3rem] px-[.5rem] py-[1rem] flex gap-2 flex-col md:flex-row justify-between items-center'>
            <div className="md:hidden flex  gap-2 items-center divide-x rounded-xl overflow-hidden w-full ">
                <div className="grid md:hidden items-center divide-x rounded-xl overflow-hidden grid-cols-5 w-full">
                    <button onClick={() => setTimeFrame("1m")} className={`flex items-center border-t border-b border-l justify-center text-[13px] ${activeTimeFrame == "1m" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"1m"}</button>
                    <button onClick={() => setTimeFrame("5m")} className={`flex items-center border-t border-b justify-center text-[13px] ${activeTimeFrame == "5m" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"5m"}</button>
                    <button onClick={() => setTimeFrame("1h")} className={`flex items-center border-t border-b justify-center text-[13px] ${activeTimeFrame == "1h" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"1h"}</button>
                    <button onClick={() => setTimeFrame("6h")} className={`flex items-center border-t border-b justify-center text-[13px] ${activeTimeFrame == "6h" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"6h"}</button>
                    <button onClick={() => setTimeFrame("24h")} className={`flex items-center border-t border-b border-r justify-center text-[13px] ${activeTimeFrame == "24h" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"24h"}</button>
                </div>
            </div>
            <div className="w-full flex items-center gap-5">
                {/* tabs */}
                <div className="md:flex hidden items-center gap-2 ">
                    <button className={`font-[700] text-[15px] whitespace-nowrap ${switchTabs == '1' ? "dark:text-[#f5f5f5] text-[#111111]" : 'dark:text-[#f5f5f5]/40 text-[#111111]/40'}`} onClick={() => {
                        updateUrlParams({ tab: "1" })
                        setSwitch('1')
                    }}>Trending</button>

                    <button className={`font-[700] text-[15px] whitespace-nowrap flex items-center gap-1 ${switchTabs == '2' ? "dark:text-[#f5f5f5] text-[#111111]" : 'dark:text-[#f5f5f5]/40 text-[#111111]/40'}`} onClick={() => {
                        updateUrlParams({ tab: "2" })
                        setSwitch('2')
                    }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M16.102 9.215a8.041 8.041 0 00-8.365 0L5.966 5.998a11.44 11.44 0 015.954-1.67c2.168 0 4.201.608 5.953 1.67l-1.771 3.218z"></path><path d="M6.776 9.901C4.808 11.51 3.542 14.02 3.542 16.84c0 1.026-.793 1.858-1.771 1.858C.793 18.697 0 17.865 0 16.84c0-4.196 1.97-7.91 4.993-10.178l1.783 3.24z"></path><path d="M20.296 16.84c0-2.82-1.265-5.33-3.233-6.939l1.782-3.24c3.023 2.268 4.993 5.982 4.993 10.178 0 1.026-.793 1.858-1.77 1.858-.979 0-1.772-.832-1.772-1.858z"></path><path d="M12 10.87l1.587 5.597a1.65 1.65 0 11-3.174 0L12 10.87z"></path></svg>
                        NextBC
                    </button>
                </div>

                <div className="w-full flex md:flex-nowrap flex-wrap gap-3">
                    {/* request interval */}
                    <div className="md:grid hidden items-center divide-x rounded-xl overflow-hidden grid-cols-5">
                        <button onClick={() => setTimeFrame("1m")} className={`h-[28px] w-[28px] min-w-[48px] flex items-center border-t border-b border-l justify-center text-[13px] ${activeTimeFrame == "1m" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"1m"}</button>
                        <button onClick={() => setTimeFrame("5m")} className={`h-[28px] w-[28px] min-w-[48px] flex items-center border-t border-b justify-center text-[13px] ${activeTimeFrame == "5m" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"5m"}</button>
                        <button onClick={() => setTimeFrame("1h")} className={`h-[28px] w-[28px] min-w-[48px] flex items-center border-t border-b justify-center text-[13px] ${activeTimeFrame == "1h" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"1h"}</button>
                        <button onClick={() => setTimeFrame("6h")} className={`h-[28px] w-[28px] min-w-[48px] flex items-center border-t border-b justify-center text-[13px] ${activeTimeFrame == "6h" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"6h"}</button>
                        <button onClick={() => setTimeFrame("24h")} className={`h-[28px] w-[28px] min-w-[48px] flex items-center border-t border-b border-r justify-center text-[13px] ${activeTimeFrame == "24h" ? "dark:text-white bg-accent-1" : "text-accent-aux-1"}`}>{"24h"}</button>
                    </div>

                    {getChain() == "sol" && <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-3 md:items-center gap-2 my-1">
                        <div className="flex items-center gap-1">
                            <Checkbox id='raydium' defaultChecked={true} />
                            <label htmlFor='raydium' className='text-[12px] cursor-pointer leading-[1] text-left'>Raydium</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <Checkbox id='pump' defaultChecked={true} />
                            <label htmlFor='pump' className='text-[12px] cursor-pointer leading-[1] text-left'>Pump</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <Checkbox id='moonshot' defaultChecked={true} />
                            <label htmlFor='moonshot' className='text-[12px] cursor-pointer leading-[1] text-left'>Moonshot</label>
                        </div>
                    </div>}

                </div>
            </div>

            {/* utility */}
            <div className="flex whitespace-nowrap gap-3 md:justify-normal justify-between items-center md:w-auto w-full md:space-y-0 space-y-2">
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex items-center gap-1 text-accent-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className='min-w-[14px]' width="14px" height="14px" fill="currentColor" viewBox="0 0 16 16"><g clipPath="url(#clip0_10037_38)"><path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z"></path><path d="M2.997 8c0 .425.345.76.76.76h8.486a.75.75 0 00.75-.76.752.752 0 00-.76-.76H3.757a.758.758 0 00-.76.76z"></path></g><defs><clipPath id="clip0_10037_38"><rect width="16" height="16"></rect></clipPath></defs></svg>
                                <p className='text-[12px] leading-[1] text-left'>Filter Token</p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-[200px] space-y-1 p-2 dark:bg-[#26282c]'>
                            <DropdownMenuLabel className='font-[400] text-[12px] text-[rgb(110,114,125)]'>Filter Token</DropdownMenuLabel>
                            <div className='flex flex-col space-y-2'>
                                <div className="">
                                    <input type="text" name='filter-1' className='outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]' placeholder='filter 1' />
                                </div>
                                <div className="">
                                    <input type="text" name='filter-2' className='outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]' placeholder='filter 2' />
                                </div>
                                <div className="">
                                    <input type="text" name='filter-3' className='outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]' placeholder='filter 3' />
                                </div>
                                <div className="">
                                    <input type="text" name='filter-4' className='outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]' placeholder='filter 4' />
                                </div>
                                <div className="">
                                    <input type="text" name='filter-5' className='outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]' placeholder='filter 5' />
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <div className="flex gap-2 justify-between">
                                <button className='bg-[#E2E8F0] dark:bg-[#393c43] font-[600] rounded-md text-[12px] py-1 w-full'>Reset</button>
                                <button className='bg-[#111111] dark:bg-white font-[600] rounded-md text-white dark:text-black text-[12px] py-1 w-full'>Apply</button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {getChain() == "sol" ? <div className="flex items-center flex-wrap lg:flex-nowrap w-full gap-2">
                        <div className="flex items-center gap-1">
                            <Checkbox id='filter risks' />
                            <label htmlFor='filter risks' className='text-[12px] cursor-pointer leading-[1] text-left'>Filter Risks</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <Checkbox id='filter wash traded' />
                            <label htmlFor='filter wash traded' className='text-[12px] cursor-pointer leading-[1] text-left capitalized'>Filter wash traded</label>
                        </div>
                    </div> :
                        <div className="flex items-center gap-1">
                            <Checkbox id='honeypot' />
                            <label htmlFor='honeypot' className='text-[12px] cursor-pointer leading-[1] text-left'>Filter Honeypot</label>
                        </div>}
                </div>
                {/*  */}
                {getChain() == "sol" ?
                    <div className="flex items-center gap-1 dark:bg-[#111111] bg-[#f5f5f5] dark:text-[#f5f5f5] text-[#111111]">
                        <Sheet>
                            <SheetTrigger className='flex items-center gap-1'>
                                <div className="flex items-center gap-2">
                                    <div className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#88D693" viewBox="0 0 16 16"><g clipPath="url(#clip0_9339_171)"><path d="M3.229 9.046L9.756 0 8.452 6.637h3.757a.2.2 0 01.162.317L5.844 16 7.03 9.363H3.39a.2.2 0 01-.161-.317z"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.5 8a6.5 6.5 0 017.933-6.341L9.63.678A7.5 7.5 0 004.9 14.832l.187-1.02A6.5 6.5 0 011.5 8zm4.663 6.237l-.174.99a7.5 7.5 0 004.781-14.2l-.231.987a6.502 6.502 0 01-4.376 12.223z"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.711 1.63c.508-.133 1.013.827.681 1.602-.335.78.978-.978 1.497-1.866L7.023.813l-.312.818zm1.575 10.985c-.345.54-.673 1.897.343 1.85 1.052-.049-.925.19-2.074.124 0 0 2.075-2.513 1.73-1.974z"></path></g><defs><clipPath id="clip0_9339_171"><rect width="16" height="16"></rect></clipPath></defs></svg>
                                    </div>
                                    <svg width="100%" height="auto" style={{ width: '59.85px' }} viewBox="0 0 59.849998474121094 17"><defs><linearGradient id="gridientf956b6abff477fdd" x1="0" y1="0" x2="100%" y2="0"><stop offset="26.87%" stopColor="#88D693"></stop><stop offset="64.85%" stopColor="#1CC9FF"></stop></linearGradient></defs><text x="50%" y="50%" dy="0.3em" textAnchor="middle" fill="url(#gridientf956b6abff477fdd)" fontSize="12" fontWeight="500"><tspan className=''>Quick Buy</tspan></text></svg>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#F5F5F5" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M8.652 2.05a2.75 2.75 0 012.696 0l4.977 2.8a2.75 2.75 0 011.402 2.397v5.51a2.75 2.75 0 01-1.402 2.397l-4.977 2.8a2.75 2.75 0 01-2.696 0l-4.978-2.8a2.75 2.75 0 01-1.402-2.397v-5.51c0-.994.536-1.91 1.402-2.397l4.978-2.8zm1.96 1.308a1.25 1.25 0 00-1.225 0l-4.977 2.8a1.25 1.25 0 00-.638 1.089v5.51c0 .451.244.868.638 1.09l4.977 2.799c.38.214.845.214 1.226 0l4.977-2.8a1.25 1.25 0 00.637-1.09v-5.51a1.25 1.25 0 00-.637-1.089l-4.977-2.8z"></path><path fillRule="evenodd" clipRule="evenodd" d="M10 8.133a1.866 1.866 0 100 3.733 1.866 1.866 0 000-3.733zM6.634 9.999a3.366 3.366 0 116.733 0 3.366 3.366 0 01-6.733 0z"></path></svg>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>

                    </div> :
                    <div className="flex items-center gap-1">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#595000"></circle><path d="M8.327 12.602l3.39-5.086a.435.435 0 00-.36-.676H8.69V3.638a.435.435 0 00-.797-.241l-3.39 5.086a.435.435 0 00.362.676H7.53v3.202a.435.435 0 00.796.241z" fill="#FFEC42"></path></svg>
                            <div className="text-[12px] md:block hidden">Linked Buy</div>
                        </div>
                        <div className="border md:w-[80px] w-[60px] flex items-center rounded-sm">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" viewBox="0 0 14 15"><path d="M7.297 0l-.094.32v9.256l.094.094 4.297-2.54L7.297 0z" fill="#fff"></path><path d="M7.297 0L3 7.13l4.297 2.54V0z" fill="#E1E1E1"></path><path d="M7.297 10.483l-.053.065v3.297l.053.155 4.3-6.055-4.3 2.538z" fill="#fff"></path><path d="M7.297 14v-3.517L3 7.945 7.297 14z" fill="#8C8C8C"></path><path d="M7.297 9.67l4.297-2.54-4.297-1.953V9.67z" fill="#D3D3D3"></path><path d="M3 7.13l4.297 2.54V5.177L3 7.13z" fill="#969696"></path></svg>
                            </div>
                            <div className="">
                                <input type="text" className='w-[60px] bg-transparent outline-none text-[12px]' />
                            </div>
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
                        </Dialog>  <Dialog>
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

                    </div>}
            </div>

        </div >
    )
}
