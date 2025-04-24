"use client";
import { Checkbox } from "@/components/ui/checkbox"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Switch } from "@/components/ui/switch"
import { truncAddress } from "@/lib/utils"
import Image from "next/image";
import { useState } from "react"

export default function Trade() {
    const [resize, setResize] = useState<"vertical" | "horizontal">("vertical")
    const [toggleLeftPane, setLeftPaneToggle] = useState(false)
    return (
        <div className="md:w-[calc(100vw-300px)] md:h-[calc(100vh-160px)] w-full h-full flex p-[6px]">
            <div className={`${toggleLeftPane ? 'md:block' : 'hidden'} w-[300px] overflow-hidden px-2 space-y-2`}>
                <div className="flex justify-between text-[13px] w-full gap-2">
                    <div className="flex gap-2">
                        <div className="">Trending</div>
                        <div className="text-accent-aux-1">Pump</div>
                    </div>

                    <button className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#F5F5F5" viewBox="0 0 16 16"><path d="M6.048 12.537a.6.6 0 01-.35-.546V8.093a.636.636 0 00-.193-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.593.593 0 01-.006.085.582.582 0 01-.855.52l-3.392-1.795z"></path></svg>
                    </button>
                </div>

                <div onClick={() => setLeftPaneToggle(false)} className="flex justify-center relative">
                    <div className="absolute dark:bg-accent-aux-1 right-0 p-[2px] cursor-pointer rounded-tl-[8px] rounded-bl-[8px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#9AA0AA" viewBox="0 0 20 20">
                            <path d="M12.322 9.582l4.705 4.706-1.607 1.606-6.312-6.312 6.313-6.312 1.606 1.606-4.705 4.706zm-6.887 0l4.706 4.706-1.607 1.606-6.312-6.312L8.419 3.27l1.722 1.606-4.706 4.706z"></path>
                        </svg>
                    </div>
                    <div className="bg-transparent border rounded-[8px] flex items-center flex-wrap gap-[8px] w-fit ">
                        <div className="px-[8px] py-[4px] flex bg-transparent border-r text-accent-aux-1 cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] justify-center">1m</div>
                        <div className="px-[8px] py-[4px] flex bg-transparent border-r text-accent-aux-1 cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] justify-center">5m</div>
                        <div className="px-[8px] py-[4px] flex bg-transparent border-r text-accent-aux-1 cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] justify-center">1h</div>
                        <div className="px-[8px] py-[4px] flex bg-transparent border-r text-accent-aux-1 cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] justify-center">6h</div>
                        <div className="px-[8px] py-[4px] flex bg-transparent  text-accent-aux-1 cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] justify-center">24h</div>
                    </div>
                </div>


                {/* table */}
                <div className="flex flex-row border-b border-accent-3 text-accent-aux-1 justify-between">
                    {/* th 1 */}
                    <div className="flex gap-[4px] py-[10px] items-center w-1/2 whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="flex gap-1 items-center cursor-pointer">
                            <div className="text-[12px]">Token</div>
                            <div className="scale-80">
                                <div className="flex cursor-pointer rotate-180 text-accent-aux-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                                </div>
                                <div className="flex cursor-pointer dark:text-[#f5f5f5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                                </div>
                            </div>
                        </div>
                        <span className="text-[12px]">/</span>
                        <div className="flex gap-1 items-center cursor-pointer">
                            <div className="text-[12px]">TXs</div>
                            <div className="scale-80">
                                <div className="flex cursor-pointer rotate-180 text-accent-aux-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                                </div>
                                <div className="flex cursor-pointer text-accent-aux-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* th 2 */}

                    <div className="flex gap-[4px] py-[10px] px-[10.58px] items-center justify-end whitespace-nowrap w-1/2 dark:text-[f5f5f5]">
                        <div className="flex items-center gap-1">
                            <div className="text-[12px]">Price</div>
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M9.37 1.846a.6.6 0 01.654.13l4 4a.6.6 0 01-.848.848L10.2 3.85V13.6a.6.6 0 11-1.2 0V2.4a.6.6 0 01.37-.554z"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.63 14.154a.6.6 0 01-.654-.13l-4-4a.6.6 0 01.848-.848L5.8 12.152V2.4a.6.6 0 011.2 0v11.2a.6.6 0 01-.37.554z"></path></svg>
                            </div>
                        </div>
                        <span className="text-[12px]">/</span>
                        <div className="flex items-center gap-1">
                            <div className="text-[12px]">%</div>
                            <div className="scale-80">
                                <div className="flex cursor-pointer rotate-180 text-accent-aux-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                                </div>
                                <div className="flex cursor-pointer dark:text-[#f5f5f5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BODY AREA */}
                <div className="overflow-y-auto h-full">
                    {
                        Array.from({ length: 15 }).map((_, key) => (
                            <div key={key} className="flex flex-row border-b border-accent-3 text-accent-aux-1 justify-between">
                                {/* th 1 */}
                                <div className="flex gap-[4px]  items-center w-1/2 whitespace-nowrap dark:text-[f5f5f5]">

                                    <div className="rounded-full border w-fit relative">
                                        <Image src={"/static/3717.png"} className='md:min-w-[30px] w-[25px] md:h-[30px] h-[25px]' width={35} height={35} alt='' />
                                        <Image src={"/static/ether.webp"} className='md:min-w-[15px] w-[10px] md:h-[15px] h-[10px] absolute bottom-0 right-0' width={15} height={15} alt='' />
                                    </div>

                                    <div className="">
                                        <h2 className="dark:text-[#f5f5f5] text-[13px] font-[500]">FBI</h2>
                                        <div className="flex items-center gap-1">
                                            <p className="text-accent-aux-1 text-[13px]">1K(527/723)</p>
                                            <p className="text-accent-green text-[12px]">1m</p>
                                        </div>
                                    </div>
                                </div>

                                {/* th 2 */}
                                <div className="flex flex-col gap-[1px] py-[10px] items-end justify-end whitespace-nowrap w-1/2 dark:text-[f5f5f5]">
                                    <div className="dark:text-[#9AA0AA] text-[12px] font-[500]">$1.25436</div>
                                    <div className="text-accent-green text-[12px]">+25k+</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ResizablePanelGroup direction={resize} className="md:block hidden">
                <ResizablePanel minSize={20} maxSize={90}>
                    <div className=" bg-black w-full h-full overflow-y-auto">
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={20} maxSize={90} className="overflow-y-auto">
                    <div className="h-full w-full overflow-scroll">
                        <TradeTable setResize={setResize} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>

            {/* mobile view */}
            <div className="w-full md:hidden">
                <div className=" bg-black w-full h-[300px] overflow-y-auto">
                </div>
                <div className="w-full overflow-scroll">
                    <TradeTable setResize={setResize} />
                </div>
            </div>

            {/* left */}
            {!toggleLeftPane && <div onClick={() => setLeftPaneToggle(true)} className="hidden absolute top-[100px] left-0 md:flex dark:bg-accent-aux-1 items-center justify-center cursor-pointer h-[44px] w-[28px] rounded-tr-[12px] rounded-br-[12px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#9AA0AA" viewBox="0 0 20 20">
                    <path d="M12.322 9.582l4.705 4.706-1.607 1.606-6.312-6.312 6.313-6.312 1.606 1.606-4.705 4.706zm-6.887 0l4.706 4.706-1.607 1.606-6.312-6.312L8.419 3.27l1.722 1.606-4.706 4.706z"></path>
                </svg>
            </div>}
        </div>
    )
}

export function TradeTable({ setResize }) {
    return (
        <div className="relative">
            <div className="sticky top-0 dark:bg-[#111111] flex gap-2 overflow-x-scroll items-center justify-between py-[10px] px-[12px]">
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={() => setResize((prev) => prev == "horizontal" ? "vertical" : "horizontal")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M3 1h5v14H3a2 2 0 01-2-2V3a2 2 0 012-2zM0 3a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V3z"></path></svg>
                    </div>
                    <div className="flex gap-[15px] text-accent-aux-1 text-[13px] font-[400] capitalize">
                        <div className="dark:hover:text-[#f5f5f5] cursor-pointer transition-all">Activity</div>
                        <div className="dark:hover:text-[#f5f5f5] cursor-pointer transition-all">Traders</div>
                        <div className="flex gap-1 items-center dark:hover:text-[#f5f5f5] cursor-pointer transition-all">
                            <div>Holders</div>
                            <div>10.83k</div>
                        </div>
                        <div className="dark:hover:text-[#f5f5f5] cursor-pointer transition-all">Following</div>
                        <div className="dark:hover:text-[#f5f5f5] cursor-pointer transition-all">position</div>
                        <div className="dark:hover:text-[#f5f5f5] cursor-pointer transition-all">limit</div>
                        <div className="dark:hover:text-[#f5f5f5] cursor-pointer transition-all">Auto</div>
                    </div>
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#5C6068" viewBox="0 0 12 12"><path d="M6.872 8.86a1 1 0 01-1.627 0L2.188 4.582A1 1 0 013.002 3h6.113a1 1 0 01.814 1.581l-3.057 4.28z"></path></svg>
                    </div>
                </div>

                <div className="flex space-x-2 font-[400]">
                    <p className="sm:text-[14px] text-[12px] capitalize whitespace-nowrap">on click</p>
                    <Switch />
                </div>
            </div>
            {/*  */}

            {/* table */}
            <DataTable />

        </div>
    )
}


export function DataTable() {
    return (
        <div className="overflow-x-scroll">
            <div className="relatie min-w-[850px] h-full dark:bg-[#111111]">
                <div className="flex flex-row border-b border-accent-3 text-accent-aux-1">
                    {/* th 1 */}
                    <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[14.11%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="text-[12px]">Time</div>
                        <div className="scale-80">
                            <div className="flex cursor-pointer rotate-180 text-accent-aux-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                            </div>
                            <div className="flex cursor-pointer dark:text-[#f5f5f5]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 7 7"><path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path></svg>
                            </div>
                        </div>
                        <div className="flex items-center cursor-pointer rounded-[4px] mr-[4px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 13.8A5.8 5.8 0 108 2.2a5.8 5.8 0 000 11.6zM8 15A7 7 0 108 1a7 7 0 000 14z"></path><path fillRule="evenodd" clipRule="evenodd" d="M8 3.4a.6.6 0 01.6.6v4.752l1.824 1.824a.6.6 0 11-.848.848l-1.971-1.97a.7.7 0 01-.205-.495V4a.6.6 0 01.6-.6z"></path></svg>
                        </div>
                        <div className="">
                            <div className="flex cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* th 2 */}
                    <div className="flex gap-[4px] py-[10px] px-[10.58px] items-center w-[14%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="text-[12px]">Type</div>
                        <div className="">
                            <div className="flex cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* th 3 */}
                    <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[14.11%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="text-[12px]">Total</div>
                        <div className="space-x-1 flex items-center text-[12px]">
                            <span>USD</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#5C6068" viewBox="0 0 16 16"><g clipPath="url(#clip0_7009_491)"><path d="M5.89 1.305a.5.5 0 01.371-.602 7.503 7.503 0 017.19 12.452.5.5 0 01-.816-.131l-1.087-2.312a.5.5 0 01.905-.425l.755 1.606A6.502 6.502 0 006.493 1.675a.5.5 0 01-.602-.37z"></path><path d="M2.992 2.695a.5.5 0 01.374.281l1.087 2.31a.5.5 0 01-.905.426l-.755-1.605a6.502 6.502 0 006.714 10.218.5.5 0 01.232.973A7.503 7.503 0 012.55 2.845a.5.5 0 01.442-.15z"></path><path d="M5.5 7A1.5 1.5 0 017 5.5h.5V5a.5.5 0 111 0v.5H10a.5.5 0 010 1H7a.5.5 0 100 1h2a1.5 1.5 0 110 3h-.5v.5a.5.5 0 01-1 0v-.5H6a.5.5 0 010-1h3a.5.5 0 000-1H6.997A1.5 1.5 0 015.5 7z"></path></g><defs><clipPath id="clip0_7009_491"><rect width="16" height="16"></rect></clipPath></defs></svg>
                        </div>
                        <div className="">
                            <div className="flex cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* th 4 */}
                    <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[10.58%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="text-[12px]">Amount</div>
                    </div>

                    {/* th 5 */}
                    <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[11.76%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="text-[12px]">Price</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M9.37 1.846a.6.6 0 01.654.13l4 4a.6.6 0 01-.848.848L10.2 3.85V13.6a.6.6 0 11-1.2 0V2.4a.6.6 0 01.37-.554z"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.63 14.154a.6.6 0 01-.654-.13l-4-4a.6.6 0 01.848-.848L5.8 12.152V2.4a.6.6 0 011.2 0v11.2a.6.6 0 01-.37.554z"></path></svg>
                    </div>

                    {/* th 6 */}
                    <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[23.52%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="text-[12px]">Marker</div>
                        <div className="flex items-center gap-1">
                            <div className="flex cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#5C6068" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                            </div>
                            <div className="dark:text-[#f5f5f5] text-[12px] flex items-center gap-1">
                                <Checkbox id="filter_bot" className="" />
                                <label htmlFor="filter_bot" className="cursor-pointer">Filter bot</label>
                            </div>
                        </div>
                    </div>

                    {/* th 7 */}
                    <div className="flex gap-[4px] py-[10px] px-[12px] justify-end items-center w-[15.29%] whitespace-nowrap dark:text-[f5f5f5]">
                        <div className="flex rounded-[4px] bg-riskWarn text-risk items-center text-[13px] font-[500] p-[4px] gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" fill="currentColor" viewBox="0 0 14 14"><rect x="1.012" y="1.012" width="3.992" height="11.975"></rect><rect x="8.996" y="1.012" width="3.992" height="11.975"></rect></svg>
                            <span>Paused</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-scroll w-full max-h-[600px] min-w-[200px]">
                    {
                        Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="flex flex-row border-b border-accent-3 text-accent-aux-1">
                                {/* td 1 */}
                                <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[14.11%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="dark:text-[#9AA0AA] text-[12px]">01/29 14:20:22</div>
                                </div>

                                {/* td 2 */}
                                <div className="flex gap-[4px] py-[10px] px-[10.58px] items-center w-[14%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="text-[12px] px-[12px] py-[4px] rounded-md font-[500] bg-[rgba(136,214,147,0.2)] text-prettyGreen">Buy</div>
                                </div>

                                {/* td 3 */}
                                <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[14.11%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="text-[12px] text-accent-green font-[500]">$68.17</div>

                                </div>

                                {/* td 4 */}
                                <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[10.58%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="text-[12px] text-accent-green font-[500]">$68.17</div>
                                </div>

                                {/* td 5 */}
                                <div className="flex gap-[4px] py-[10px] px-[12px] items-center w-[11.76%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="text-[12px] text-accent-green font-[500]">$68.17</div>
                                </div>

                                {/* td 6 */}
                                <div className="flex flex-col gap-[4px] py-[10px] px-[12px] items-start  w-[23.52%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="flex w-[100px] gap-1 items-center">
                                        <div className="text-[12px] text-accent-green font-[500]">{truncAddress("✨HerueunduansdjnsidiY")}</div>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#9AA0AA" viewBox="0 0 14 14"><path d="M7.572 3.558l2.625 2.695L3.625 13H1v-2.695l6.572-6.747zm.75-.77l1.515-1.556a.75.75 0 011.075 0l1.578 1.62a.75.75 0 010 1.047l-1.543 1.584L8.322 2.79zM7.308 11.5h4.939a.75.75 0 110 1.5h-5.69a.44.44 0 01-.31-.75l.53-.53a.75.75 0 01.531-.22z"></path></svg>
                                        </button>
                                        <div className="flex h-[14px] px-[4px] rounded-[4px] bg-[#393c42] text-[10px] items-center">3</div>
                                    </div>

                                    <div className="h-[3px] rounded-[22px] bg-[rgb(57,60,67)] w-[100px] text-left">
                                        <div className="h-[3px] rounded-[22px] bg-[rgb(154,160,170)]" style={{ width: "37.9912%" }}></div>
                                    </div>
                                </div>

                                {/* td 7 */}
                                <div className="flex justify-end gap-[4px] py-[10px] px-[12px] items-center w-[15.29%] whitespace-nowrap dark:text-[f5f5f5]">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M4 6a2 2 0 012-2h2a1 1 0 000-2H6a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4v-2a1 1 0 10-2 0v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm7-3a1 1 0 011-1h4a2 2 0 012 2v4a1 1 0 11-2 0V5.414l-5.293 5.293a1 1 0 01-1.414-1.414L14.586 4H12a1 1 0 01-1-1z"></path></svg>
                                        <div className="flex text-[12px] ml-[0.1rem]">Share</div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#9AA0AA" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.702 3.225l.006.006 3.635 3.547c.355.346.554.82.554 1.315v3.898a.6.6 0 11-1.2 0V8.093a.636.636 0 00-.192-.456L1.87 4.09C1.088 3.327 1.628 2 2.72 2h10.562c1.093 0 1.633 1.328.85 2.09l-3.64 3.547a.636.636 0 00-.191.456v5.634a.6.6 0 01-1.2 0V8.093c0-.495.2-.97.554-1.315l3.64-3.547.005-.006.001-.002-.002-.012a.03.03 0 00-.007-.01h-.002l-.008-.001H2.71a.03.03 0 00-.006.011.03.03 0 00-.003.012l.001.002z"></path></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zM6.465 5.501a.386.386 0 00-.266.11L4.39 7.42a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.109l1.81-1.81a.188.188 0 00-.133-.32H6.465zm0 6.758a.376.376 0 00-.266.11l-1.81 1.81a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.11l1.81-1.81a.188.188 0 00-.133-.32H6.465zm7.487-3.289a.376.376 0 00-.266-.11H4.522a.188.188 0 00-.133.321l1.81 1.81c.07.07.165.11.266.11h9.164a.188.188 0 00.133-.32l-1.81-1.81z"></path></svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* <Sheet /> */}
        </div>
    )
}
