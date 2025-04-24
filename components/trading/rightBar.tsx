'use client';
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import Image from 'next/image'
import QuickSettingModal from '../common/quickSettingModal';
import { Switch } from '../ui/switch';
import { copyToClipboard, formatNumber, truncAddress } from '@/lib/utils';

export default function RightBar() {
    return (
        <div className="w-[300px] rounded-tl-[12px]  h-[calc(100vh-160px)] overflow-y-auto rounded-tr-[12px]">
            <div className='flex flex-col w-full rounded-[12px] overflow-hidden'>
                <div className='flex h-[32px] justify-between bg-accent-3 py-[6px] pb-[6px] w-full'>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href="https://x.com/search?q=$PILL">
                        <div className='flex items-center gap-[2px] text-[#f5f5f5]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.213 1.988a7.14 7.14 0 017.135 7.234c-.035 3.922-3.28 7.111-7.203 7.082-3.985-.03-7.181-3.276-7.14-7.25.042-3.933 3.253-7.081 7.208-7.066zm-.058 12.61a5.473 5.473 0 005.508-5.412c.04-3.025-2.465-5.536-5.51-5.524-3.007.012-5.45 2.467-5.45 5.476a5.455 5.455 0 005.452 5.46z"></path>
                                <path d="M16.666 17.795l-1.24-1.24a.75.75 0 010-1.056l.055-.055a.749.749 0 011.056 0l1.24 1.24a.75.75 0 010 1.057l-.054.054a.75.75 0 01-1.057 0z"></path>
                            </svg>
                            Name
                        </div>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href="https://x.com/search?q=5XqzzdodsNtAM8TtQyiqGVbD7GwLBBN7oVnRA3hLpump">
                        <div className='flex items-center gap-[2px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.213 1.988a7.14 7.14 0 017.135 7.234c-.035 3.922-3.28 7.111-7.203 7.082-3.985-.03-7.181-3.276-7.14-7.25.042-3.933 3.253-7.081 7.208-7.066zm-.058 12.61a5.473 5.473 0 005.508-5.412c.04-3.025-2.465-5.536-5.51-5.524-3.007.012-5.45 2.467-5.45 5.476a5.455 5.455 0 005.452 5.46z"></path>
                                <path d="M16.666 17.795l-1.24-1.24a.75.75 0 010-1.056l.055-.055a.749.749 0 011.056 0l1.24 1.24a.75.75 0 010 1.057l-.054.054a.75.75 0 01-1.057 0z"></path>
                            </svg>
                            CA
                        </div>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href="https://lifechangingpill.com/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                            <g clipPath="url(#clip0_1553_2200)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM6.446 2.831A8.037 8.037 0 003.07 6h2.323c.212-1.023.505-1.96.865-2.77.06-.136.123-.269.188-.399zM2 10c0-.69.088-1.36.252-2h2.842a21.008 21.008 0 000 4H2.252A8.013 8.013 0 012 10zm1.07 4a8.037 8.037 0 003.376 3.169 9.877 9.877 0 01-.188-.399c-.36-.81-.653-1.747-.865-2.77H3.07zm4.372 0c.173.732.392 1.392.643 1.958.328.738.693 1.273 1.047 1.61.35.333.641.432.868.432.227 0 .518-.1.867-.432.355-.337.72-.872 1.048-1.61.251-.566.47-1.226.643-1.958H7.442zm7.165 0a13.716 13.716 0 01-.865 2.77c-.06.136-.123.269-.188.399A8.037 8.037 0 0016.93 14h-2.323zm3.14-2h-2.841a21.027 21.027 0 000-4h2.842c.165.64.252 1.31.252 2s-.087 1.36-.252 2zm-4.851 0H7.104A18.907 18.907 0 017 10c0-.693.037-1.362.104-2h5.792c.067.638.104 1.307.104 2 0 .693-.037 1.362-.104 2zm1.71-6h2.324a8.037 8.037 0 00-3.376-3.169c.065.13.128.263.188.399.36.81.653 1.747.865 2.77zm-6.52-1.958c-.252.566-.47 1.226-.644 1.958h5.116a11.248 11.248 0 00-.643-1.958c-.328-.738-.693-1.273-1.047-1.61C10.518 2.099 10.226 2 10 2c-.227 0-.518.1-.868.432-.354.337-.719.872-1.047 1.61z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_1553_2200">
                                    <rect width="20" height="20"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href="https://twitter.com/pillcto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 12 12">
                            <g clipPath="url(#clip0_7920_513)">
                                <path d="M9.282 1h1.71L7.255 5.27l4.394 5.809H8.21L5.515 7.555 2.43 11.08H.721l3.995-4.567L.5 1h3.528l2.436 3.22L9.282 1zm-.6 9.056h.947L3.513 1.97H2.497l6.185 8.086z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_7920_513">
                                    <rect width="12" height="12"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <a className="flex text-[12px] dark:text-[#f5f5f5] text-[#000] justify-center items-center cursor-pointer border-r-[1px] border-[#393c43] flex-grow flex-shrink px-[8px] whitespace-nowrap" target="_blank" href="https://t.me/lifechangingpill">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 12 12">
                            <g clipPath="url(#clip0_7920_515)">
                                <path d="M11.894 1.91l-1.8 8.487c-.134.6-.49.746-.992.465L6.36 8.842l-1.322 1.273c-.147.147-.27.27-.551.27l.196-2.793L9.764 3c.22-.196-.05-.307-.344-.11L3.138 6.844.43 6c-.588-.183-.6-.588.122-.869l10.582-4.078c.49-.183.918.11.76.857z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_7920_515">
                                    <rect width="12" height="12"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                    <div className='flex px-[8px] items-center justify-center'>
                        <div className='flex gap-[4px] items-center justify-center min-w-[80px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#FFD039" viewBox="0 0 14 14">
                                <g clipPath="url(#clip0_9436_2400)">
                                    <path d="M3.252 4.28L1.75 5.784l1.75 1.75 1.75-1.75-1.503-1.502a.35.35 0 00-.495 0z"></path>
                                    <path d="M10.253 4.28L8.75 5.784l1.75 1.75 1.75-1.75-1.502-1.502a.35.35 0 00-.495 0z"></path>
                                    <path d="M.488 4.516c-.117-.66.741-1.023 1.132-.478L2.9 5.819a.56.56 0 00.894.02l2.712-3.432a.63.63 0 01.989 0l2.711 3.433a.56.56 0 00.894-.02l1.28-1.782c.391-.545 1.25-.183 1.132.478l-1.056 5.911a1.4 1.4 0 01-1.378 1.154H2.922a1.4 1.4 0 01-1.378-1.154L.488 4.516z"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_9436_2400">
                                        <rect width="14" height="14"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg viewBox="0 0 44.54999923706055 17" className='w-[41px]'>
                                <defs>
                                    <linearGradient id="gridient6ffd6a03d473ff4b" x1="0" y1="0" x2="100%" y2="0">
                                        <stop offset="26.87%" stopColor="#FFCD1C"></stop>
                                        <stop offset="64.85%" stopColor="#FF41E1"></stop>
                                    </linearGradient>
                                </defs>
                                <text x="50%" y="50%" dy="0.3em" textAnchor="middle" fill="url(#gridient6ffd6a03d473ff4b)" fontSize="12px" fontWeight="500">
                                    <tspan>Update</tspan>
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>


                <div className="bg-accent-2 pb-2">
                    <div className='flex h-fit w-full flex-col py-[8px] text-[12px]'>
                        <div className='flex flex-col'>
                            <div className="flex justify-between pb-[8px] px-[12px] border-b border-[rgb(38,40,44)]">
                                <div className='flex flex-col gap-[4px]'>
                                    <div className='flex w-full justify-start text-accent-aux-1'>MKT Cap</div>
                                    <div className='text-[12px] w-full flex  font-[500]'>$4.6M</div>
                                </div>
                                <div className='flex flex-col gap-[4px]'>
                                    <div className='flex w-full justify-start text-accent-aux-1'>Liq</div>
                                    <div className='text-[12px] w-full flex  font-[500]'>$423.2K</div>
                                </div>
                                <div className='flex flex-col gap-[4px]'>
                                    <div className='flex w-full justify-start text-accent-aux-1'>24h Vol</div>
                                    <div className='text-[12px] w-full flex  font-[500]'>$15.5M</div>
                                </div>
                                <div className='flex flex-col gap-[4px]'>
                                    <div className='flex w-full justify-start text-accent-aux-1'>Holders</div>
                                    <div className='text-[12px] w-full flex justify-end font-[500]'>
                                        <div className='text-[13px] gap-[4px] w-full flex items-center font-[500]'>
                                            <p>6K</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between px-[12px] mt-[6px] border-b border-[rgb(38,40,44)] pb-[8px]">
                            <div className='flex flex-col gap-[6px]'>
                                <div className='flex text-accent-aux-1 w-full justify-start'>Pair</div>
                                <div className='flex w-full font-[500] text-accent-aux-1'>PILL</div>
                                <div className='flex w-full font-[500] text-accent-aux-1'>SOL</div>
                            </div>
                            <div className='flex flex-col gap-[6px]'>
                                <div className='flex text-accent-aux-1 w-full justify-center'>Liq/Initial</div>
                                <div className='flex w-full font-[500] text-[#fff] dark-[#000]'>46.3M/206.9M (20.7%)</div>
                                <div className='flex w-full font-[500] text-[#fff] dark-[#000]'>900.23/79.01 <span className='text-accent-green'>(+1K%)</span></div>
                            </div>
                            <div className='flex flex-col gap-[6px]'>
                                <div className='flex text-accent-aux-1 w-full justify-start'>Value</div>
                                <div className='flex w-full font-[500] text-[#fff] dark-[#000]'>$211.9K</div>
                                <div className='flex w-full font-[500] text-[#fff] dark-[#000]'>$212.1K</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between mt-[6px] px-[12px]'>
                        <div className='flex flex-col gap-[4px] text-[12px]'>
                            <div className='flex text-accent-aux-1 w-full justify-start'>NoMint</div>
                            <div className="flex items-center text-accent-green">
                                Yes
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" style={{ marginLeft: "4px" }} viewBox="0 0 16 16"><path d="M14.78 3.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 011.06-1.06l3.97 3.97 7.47-7.47a.75.75 0 011.06 0z"></path></svg>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[4px] text-[12px]'>
                            <div className='flex text-accent-aux-1 w-full justify-start'>Blacklist</div>
                            <div className="flex items-center text-accent-green">
                                No
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" style={{ marginLeft: "4px" }} viewBox="0 0 16 16"><path d="M14.78 3.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 011.06-1.06l3.97 3.97 7.47-7.47a.75.75 0 011.06 0z"></path></svg>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[4px] text-[12px]'>
                            <div className='flex text-accent-aux-1 w-full justify-start'>Burnt</div>
                            <div className='flex items-center text-accent-green'>100% 🔥</div>
                        </div>
                        <div className='flex flex-col gap-[4px] text-[12px]'>
                            <div className='flex text-accent-aux-1 w-full justify-start'>Top 10</div>
                            <div className="flex items-center text-accent-green">
                                Yes
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" style={{ marginLeft: "4px" }} viewBox="0 0 16 16"><path d="M14.78 3.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 011.06-1.06l3.97 3.97 7.47-7.47a.75.75 0 011.06 0z"></path></svg>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CONNECT BANNER */}
                <div className="flex items-center bg-accent-2 rounded-[12px] p-[12px] w-full justify-between h-[60px] font-[500] cursor-pointer mt-2 gap-[4px]">
                    <div className="flex items-center gap-1 flex-grow flex-shrink text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="mr-2"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.276 1.652a2 2 0 00-.765-.152H3.5a3 3 0 00-3 3v11a3 3 0 003 3h13a3 3 0 003-3V7.993a2 2 0 00-2-2h-1.989V3.5a2 2 0 00-1.235-1.848zM2 4.5a1.501 1.501 0 001.356 1.493L3.5 6H14v1.5H3.5A3 3 0 012 7.098V15.5a1.5 1.5 0 001.356 1.493L3.5 17h13a1.5 1.5 0 001.493-1.356L18 15.5V7.993a.5.5 0 00-.41-.492l-.09-.008h-3.489V3.5a.5.5 0 00-.41-.492L13.511 3H3.5a1.5 1.5 0 00-1.493 1.356L2 4.5z"
                            ></path>
                            <path d="M13.25 9.5h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 110-1.5z"></path>
                        </svg>
                        <div className="text-sm ">
                            <div className="font-semibold flex">Trading in secs 🚀</div>
                        </div>
                    </div>
                    <div className="flex h-[28px] rounded-[8px] text-[12px] bg-[#88d693] items-center px-[12px] text-[#111111] font-[500]">
                        Connect TGBot
                    </div>
                </div>


                {/* buy sell auto */}
                <BuySellAuto />

                {/* metric */}
                <Metric />

                {/* pool Info */}
                <PoolInfo />

                {/* degen audit */}
                <DegenAudit />
            </div>
        </div>
    )
}


export function TpslInput({ types }: { types: string }) {
    return (
        <div className="flex">
            {/* tp */}
            <div className="flex flex-col gap-[4px]">
                <div className="flex w-full bg-[#111111] h-[36px] rounded-[8px] border-[1px] border-accent-3">
                    <div className="flex px-[12px] whitespace-nowrap h-[36px] items-center dark:text-[#9AA0AA] text-[12px] pr-0">{types == "tp" ? "TP" : "Sell"} %</div>
                    <div className="relative z-0 shadow-none dark:text-[#f5f5f5] font-[500] w-full pr-0 text-left">
                        <input type="text"
                            inputMode="decimal"
                            pattern="[0-9]*(.[0-9]+)?"
                            role="spinbutton"
                            aria-valuemin={-99}
                            aria-valuemax={9007199254740991}
                            autoComplete="off"
                            autoCorrect="off"
                            className="text-[12px] text-right w-full h-[36px] rounded-md min-w-0 outline-none relative appearance-none px-[12px] bg-inherit dark:text-[#f5f5f5] font-[500] pr-[4px]" />
                    </div>
                    <div className="flex px-[12px] whitespace-nowrap h-[36px] items-center dark:text-[#9AA0AA] text-[12px] pl-0">%</div>
                </div>
            </div>
        </div>
    )
}

export function BuySellAuto() {
    const [tab, setTab] = useState("buy")
    return (
        <div className="bg-accent-2 w-full p-[12px] mt-3">
            <div className='w-full min-h-[120px] rounded-[12px] relative'>
                <div className='h-auto overflow-hidden'>
                    <div className='flex flex-col w-full gap-[12px] text-accent-aux-1 text-[12px]'>
                        <div className='flex gap-[8px]'>
                            <div className="dark:bg-[#111111] flex p-[2px] rounded-[8px] flex-grow flex-shrink text-[12px]">
                                <div onClick={() => setTab("buy")} className={`${tab == "buy" ? "bg-prettyGreen dark:text-black" : ""} flex h-[32px] text-[12px] text-accent-aux-1 bg-[#111111] w-1/2 rounded-[6px] justify-center items-center gap-[4px] cursor-pointer`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.408 18.657l6.378-9.566a.818.818 0 00-.68-1.272H11.09V1.796a.818.818 0 00-1.499-.454L3.214 10.91a.818.818 0 00.68 1.272H8.91v6.023a.818.818 0 001.498.453z"></path>
                                    </svg>
                                    Buy
                                </div>
                                <div onClick={() => setTab("sell")} className={`${tab == "sell" ? "bg-prettyRed dark:text-black" : ""} flex h-[32px] text-[12px] text-accent-aux-1 bg-[#111111] w-1/2 rounded-[6px] justify-center items-center gap-[4px] cursor-pointer`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                        <g clipPath="url(#clip0_5354_11962)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.131 7.134a1.6 1.6 0 000 2.263l5.657 5.657a1.6 1.6 0 002.263 0l6.058-6.058c.3-.3.468-.707.468-1.131V2.208a1.6 1.6 0 00-1.6-1.6H8.32a1.6 1.6 0 00-1.131.469L1.131 7.134zm10.069-.73a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z"></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5354_11962">
                                                <rect width="16" height="16"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Sell
                                </div>
                                <div onClick={() => setTab("auto")} className={`${tab == "auto" ? "bg-accent-3 dark:text-black" : ""} flex h-[32px] text-[12px] text-accent-aux-1 bg-[#111111] w-1/2 rounded-[6px] justify-center items-center gap-[4px] cursor-pointer`}>
                                    <svg viewBox="0 0 28.450000762939453 17" className='w-[28.5px]'>
                                        <defs>
                                            <linearGradient id="gridient0c124fb4fbf4787a" x1="0" y1="0" x2="100%" y2="0">
                                                <stop offset="26.87%" stopColor="#88D693"></stop>
                                                <stop offset="64.85%" stopColor="#1CC9FF"></stop>
                                            </linearGradient>
                                        </defs>
                                        <text x="50%" y="50%" dy="0.3em" textAnchor="middle" fill="url(#gridient0c124fb4fbf4787a)" fontSize="12" fontWeight="400">
                                            <tspan>Auto</tspan>
                                        </text>
                                    </svg>
                                    <div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* tabs */}
                    {tab == "buy" && <BuyTab />}
                    {tab == "sell" && <SellTab />}
                    {tab == "auto" && <NotConnected />}
                </div>
            </div>
        </div>
    )
}

export function BuyTab() {
    const [tpSlCheck, setTpSlCheck] = useState(false)
    const [moreSetting, setMoreSetting] = useState(false)
    const [buyTabs, setBuyTabs] = useState("buy-now")

    return (
        <div className="flex flex-col gap-[8px] space-y-2 mt-2">
            <div className='flex item-center justify-between h-[18px] text-[12px]'>
                <div className='flex justify-start gap-[12px]'>
                    <div onClick={() => setBuyTabs("buy-now")} className={`flex font-[500] ${buyTabs == "buy-now" ? 'dark:text-[#ffff]' : 'dark:text-accent-aux-1'} cursor-pointer`}>Buy Now</div>
                    <div onClick={() => setBuyTabs("buy-dip")} className={`flex font-[500] ${buyTabs == "buy-dip" ? 'dark:text-[#ffff]' : 'dark:text-accent-aux-1'} cursor-pointer`}>Buy Dip</div>
                </div>
                <div className='flex whitespace-nowrap text-accent-aux-1'>Bal:--SOL</div>
            </div>

            {/* tabs for buy now and buy dip */}
            {
                buyTabs == "buy-now" ?
                    <BuyNow setTpSlCheck={setTpSlCheck} tpSlCheck={tpSlCheck} /> :
                    <BuyDip />
            }
            <MoreSettingBuySellSection moreSetting={moreSetting} setMoreSetting={setMoreSetting} />
        </div>
    )
}

export function SellTab() {
    const [moreSetting, setMoreSetting] = useState(false)
    const [sellTabs, setsellTabs] = useState("sell-now")

    return (
        <div className="flex flex-col gap-[8px] space-y-2 mt-2">
            <div className='flex item-center justify-between h-[18px] text-[12px]'>
                <div className='flex justify-start gap-[12px]'>
                    <div onClick={() => setsellTabs("sell-now")} className={`flex font-[500] ${sellTabs == "sell-now" ? 'dark:text-[#ffff]' : 'dark:text-accent-aux-1'} cursor-pointer capitalize`}>sell Now</div>
                    <div onClick={() => setsellTabs("sell-auto")} className={`flex font-[500] ${sellTabs == "sell-auto" ? 'dark:text-[#ffff]' : 'dark:text-accent-aux-1'} cursor-pointer capitalize`}>sell auto</div>
                </div>
                <div className='flex whitespace-nowrap text-accent-aux-1'>Bal:--SOL</div>
            </div>

            {/* tabs for buy now and buy dip */}
            {sellTabs == "sell-now" && <SellNow />}
            {sellTabs == "sell-auto" && <SellAuto />
            }
            <MoreSettingBuySellSection moreSetting={moreSetting} setMoreSetting={setMoreSetting} />
        </div >
    )
}

export function SellNow() {
    return (
        <>
            <div className='flex flex-col gap-[12px]'>
                <div className='flex flex-col rounded-[8px] border-[1px] border-accent-3 overflow-hidden'>
                    <div className="flex w-full bg-[#111111] h-[36px] rounded-[8px] border-accent-3">
                        <div className='flex px-[12px] whitespace-nowrap h-[36px] items-center text-[#9AA0AA] text-[12px] pr-0'>Amount</div>
                        <div className="relative z-0 shadow-none dark:text-[#f5f5f5] font-[500] w-full pr-0">
                            <input type="text"
                                inputMode="decimal"
                                pattern="[0-9]*(.[0-9]+)?"
                                role="spinbutton"
                                aria-valuemin={-9007199254740991}
                                aria-valuemax={9007199254740991}
                                autoComplete="off"
                                autoCorrect="off"
                                className="text-[12px] text-left w-full h-[36px] rounded-md min-w-0 outline-none relative appearance-none px-[12px] bg-inherit dark:text-[#f5f5f5] font-[500] pr-[4px]" />
                        </div>
                        <div className='flex px-[12px] whitespace-nowrap h-[36px] items-center text-[#9AA0AA] text-[12px] pl-0'>SOL</div>
                    </div>
                    <div className='flex items-center w-full'>
                        <div className="flex items-center flex-grow flex-shrink justify-end border-t-[1px] border-accent-3">
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r border-l border-accent-3'>
                                <div className='flex'>25%</div>
                            </div>
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r border-accent-3'>
                                <div>50%</div>
                            </div>
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r border-accent-3'>
                                <div>75%</div>
                            </div>
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r  border-accent-3'>
                                <div>100%</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='flex my-[-2px] text-[12px] text-accent-aux-1'>1 SOL ≈ 47.77K PILL</div>
        </>
    )
}

export function BuyNow({ setTpSlCheck, tpSlCheck }) {
    return (
        <>
            <div className='flex flex-col gap-[12px]'>
                <div className='flex flex-col rounded-[8px] border-[1px] border-accent-3 overflow-hidden'>
                    <div className="flex w-full bg-[#111111] h-[36px] rounded-[8px] border-accent-3">
                        <div className='flex px-[12px] whitespace-nowrap h-[36px] items-center text-[#9AA0AA] text-[12px] pr-0'>Amount</div>
                        <div className="relative z-0 shadow-none dark:text-[#f5f5f5] font-[500] w-full pr-0">
                            <input type="text"
                                inputMode="decimal"
                                pattern="[0-9]*(.[0-9]+)?"
                                role="spinbutton"
                                aria-valuemin={-9007199254740991}
                                aria-valuemax={9007199254740991}
                                autoComplete="off"
                                autoCorrect="off"
                                className="text-[12px] text-left w-full h-[36px] rounded-md min-w-0 outline-none relative appearance-none px-[12px] bg-inherit dark:text-[#f5f5f5] font-[500] pr-[4px]" />
                        </div>
                        <div className='flex px-[12px] whitespace-nowrap h-[36px] items-center text-[#9AA0AA] text-[12px] pl-0'>SOL</div>
                    </div>
                    <div className='flex items-center w-full'>
                        <div className="flex items-center flex-grow flex-shrink justify-end border-t-[1px] border-accent-3">
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r border-l border-accent-3'>
                                <div className='flex'>0.01</div>
                            </div>
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r border-accent-3'>
                                <div>0.1</div>
                            </div>
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r border-accent-3'>
                                <div>0.5</div>
                            </div>
                            <div className='flex flex-grow flex-shrink py-1 cursor-pointer hover:bg-accent-3 gap-[4px] items-center justify-center text-[12px] font-[500] overflow-hidden text-ellipsis whitespace-nowrap text-accent-aux-1 border-b border-r  border-accent-3'>
                                <div>1</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='flex my-[-2px] text-[12px] text-accent-aux-1'>1 SOL ≈ 47.77K PILL</div>
            <div className='flex flex-col'>
                <div className='flex gap-[12px]'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='flex gap-[2px] items-center cursor-pointer'>
                                    <label htmlFor='tp&sl' className="cursor-pointer inline-flex items-center relative">
                                        <input onChange={(v) => {
                                            setTpSlCheck(v.target.checked);
                                        }} id='tp&sl' className="peer border-0 h-[1px] w-[1px] m-[-1px] p-0 overflow-hidden whitespace-nowrap absolute"
                                            style={{ border: '0px', clip: 'rect(0px, 0px, 0px, 0px)' }}
                                            type="checkbox" />
                                        <span className="inline-flex items-center peer-checked:bg-white peer-checked:text-black text-accent-aux-1 justify-center select-none flex-shrink-0 w-[14px] h-[14px] border-[1px] border-accent-aux-1 bg-accent-aux-1 size-4 rounded-[2px]" aria-hidden="true">
                                            <svg viewBox="0 0 12 10" style={{ fill: "none", strokeWidth: "2px", stroke: 'currentcolor', strokeDasharray: '16px', }}><polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>
                                        </span>
                                    </label>
                                    <div className="flex text-[13px] text-accent-1 cursor-pointer underline items-center gap-[2px]">TP&amp;SL<div className="flex underline"></div></div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side={'left'} className='bg-[#f7f5f5] dark:bg-[#000] dark:text-white text-[#111111] text-[12px] font-[400]'>
                                <p className='font-[400] text-[11px]'>Automatically triggers a sell when the price reaches the take profit.</p>
                                <p className='font-[400] text-[11px]'>Take-profit price = current price + current price * take-profit percentage</p>
                                <p className='font-[400] text-[11px] mt-2'>Automatically triggers a sell when the price falls to the stop-loss price.</p>
                                <p className='font-[400] text-[11px]'>Stop-loss price = current price - current price * stop-loss percentage</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            {tpSlCheck ? <NotConnected /> :
                <div className="relative h-auto space-y-2">
                    {/* tpsl input */}
                    <div className="flex flex-col items-center">
                        <div className="">
                            {/* list of tp-sl inputs */}
                            <div className="flex gap-[5px] items-center">
                                <TpslInput types='tp' />
                                <TpslInput types='sell' />
                                <button className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#9AA0AA" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="4" rx="1"></rect><rect x="7" y="1" width="6" height="4" rx="1"></rect><path fillRule="evenodd" clipRule="evenodd" d="M4 6h3.8a.8.8 0 00-.8.8v8.4a.8.8 0 001.6 0V6.8a.8.8 0 00-.8-.8h4.4a.8.8 0 00-.8.8v8.4a.8.8 0 001.6 0V6.8a.8.8 0 00-.8-.8H16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V6z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <button type="button" className="inline-flex min-w-[2.5rem] appearance-none items-center justify-center select-none relative border-[1px] border-accent-3 hover:border-accent-aux-1 mt-4 rounded-sm whitespace-nowrap leading-[1.2] font-[400] text-[12px] px-[.5rem] py-[.8rem] bg-transparent w-full gap-[4px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M8 2a1 1 0 011 1v4h4a1 1 0 110 2H9v4a1 1 0 11-2 0V9H3a1 1 0 010-2h4V3a1 1 0 011-1z"></path></svg>
                            Add
                        </button>
                    </div>

                    {/* button */}
                    <div className='flex items-center gap-[4px]'>
                        <div className="flex justify-center w-full">
                            <button type="button" className="inline-flex w-full appearance-none items-center justify-center select-none relative whitespace-nowrap leading-[1.2] min-w-[2.5rem] px-[.7rem] py-[.7rem] dark:bg-[#393C43] dark:text-accent-aux-1 text-[14px] rounded-[8px] font-[500]">Buy</button>
                        </div>
                        <QuickSettingModal className={`w-auto h-auto`} />
                    </div>
                </div>
            }
        </>
    )
}

export function BuyDip() {
    return (
        <NotConnected />
    )
}

export function SellAuto() {
    return (
        <NotConnected />
    )
}


export function MoreSettingBuySellSection({ moreSetting, setMoreSetting }) {
    return (
        <>
            <div onClick={() => setMoreSetting(!moreSetting)} className='flex flex-shrink flex-grow gap-[12px] flex-wrap justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='flex items-center gap-1 text-[12px] whitespace-nowrap'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#9AA0AA" viewBox="0 0 14 14">
                                        <path d="M0 6.969a7.15 7.15 0 000 .062V6.97z"></path>
                                        <path d="M.034 6.31h3.073L4.65 2.434a.686.686 0 011.273 0l2.916 7.33 1.86-3.119a.685.685 0 01.588-.335h2.68a7 7 0 00-13.932 0z"></path>
                                        <path d="M13.966 7.69h-2.292l-2.372 3.975a.685.685 0 01-1.224-.098l-2.792-7.02-1.078 2.71a.686.686 0 01-.637.433H.034a7 7 0 0013.933 0z"></path>
                                    </svg>
                                    <div>Auto (<span className='text-gRed'>22.5%</span>)</div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] dark:text-white text-[#111111] text-[12px] font-[400]'>
                                Spillage
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='flex cursor-pointer item-center gap-1 text-[12px] whitespace-nowrap'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#9AA0AA" viewBox="0 0 14 14">
                                            <g clipPath="url(#clip0_9551_44)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M3.5 8.05A1.75 1.75 0 001.75 6.3L.7 9.8h2.8V8.05zm6.19-.45a4.2 4.2 0 012.66-.95h.039c.658 0 .952.825.443 1.242L10.5 9.8l-4.2 3.5H.7V9.8H7l2.69-2.2z"></path>
                                                <circle cx="7" cy="3.5" r="3.5"></circle>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_9551_44">
                                                    <rect width="14" height="14"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div>0.006</div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] dark:text-white text-[#111111] text-[12px] font-[400]'>
                                PRIO
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>



                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='flex cursor-pointer item-center gap-1 text-[12px] whitespace-nowrap'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#9AA0AA" viewBox="0 0 14 14">
                                        <path d="M.246 7.97c0-.533.433-.966.967-.966h4.515c.209 0 .416.044.607.128l1.73.765c.396.175.85.17 1.242-.013l1.58-.739c.199-.093.416-.141.636-.141h1.265a.967.967 0 010 1.934H1.213a.967.967 0 01-.967-.967z"></path>
                                        <path d="M13.264 11.29a1.93 1.93 0 01-1.93 1.93H2.665a1.93 1.93 0 01-1.93-1.93v-.909h12.53v.908z"></path>
                                        <path d="M5.268 1A4.533 4.533 0 00.735 5.533h12.53A4.533 4.533 0 008.731 1H5.268zm2.697 1.179h.965v.965h-.965v-.965zm-2.895.965h.965v.965H5.07v-.965zm5.79.965v.965h-.965v-.965h.965z"></path>
                                    </svg>
                                    <div>OFF</div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] dark:text-white text-[#111111] text-[12px] font-[400]'>
                                MEV
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <div className={`${moreSetting ? "rotate-180" : ""} text-accent-aux-1`}>
                    <svg viewBox="0 0 24 24" className='size-5' focusable="false"><path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
                </div>
            </div>
            {
                moreSetting && <div className='flex text-[12px] text-accent-aux-1 gap-[8px] flex-col'>
                    <div className='flex  justify-between items-center'>
                        <div className='flex items-center'>Slippage</div>
                        <div className='flex w-[168px] gap-[8px]'>
                            <div className='flex mt-[8px] justify-between w-full'>
                                <div className='flex text-center w-[80px] h-[28px] border-[1px] dark:border-[#f5f5f5] rounded-[8px] items-center dark:text-[#f5f5f5] justify-center text-[12px]'>Auto 22.5%</div>
                                <div className="w-[80px] flex relative isolate text-center dark:text-[#9AA0AA]">
                                    <div className="relative z-0 border border-accent-aux-1 rounded-md flex">
                                        <input type="text" className="text-[12px] text-left w-full rounded-md min-w-0 outline-none relative appearance-none px-[12px] bg-inherit dark:text-[#f5f5f5] font-[500] pr-[4px]" />
                                        <div className="flex px-[6px] whitespace-nowrap items-center dark:text-[#9AA0AA] text-[12px] pl-0">%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex  justify-between items-center'>
                        <div className='flex items-center'>Priority Fee (SOL)</div>
                        <div className='flex w-[168px] gap-[8px]'>
                            <div className='flex mt-[8px] justify-between w-full'>
                                <div className='flex text-center w-[80px] h-[28px] border-[1px] dark:border-[#f5f5f5] rounded-[8px] items-center dark:text-[#f5f5f5] justify-center text-[12px]'>Auto 22.5%</div>
                                <div className="w-[80px] flex relative isolate text-center dark:text-[#9AA0AA]">
                                    <div className="relative z-0 border border-accent-aux-1 rounded-md flex">
                                        <input type="text" className="text-[12px] text-left w-full rounded-md min-w-0 outline-none relative appearance-none px-[12px] bg-inherit dark:text-[#f5f5f5] font-[500] pr-[4px]" />
                                        <div className="flex px-[6px] whitespace-nowrap items-center dark:text-[#9AA0AA] text-[12px] pl-0">%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex  justify-between items-center'>
                        <div className='flex items-center'>Priority Fee (SOL)</div>
                        <Switch />
                    </div>
                </div>
            }
        </>
    )
}



export function NotConnected() {
    return (
        <div className="dark:bg-[#111111] mt-2 z-[10] px-[12px] rounded-[8px] w-full pt-[32px] pb-[32px]">
            <div className="pb-[36px]">
                <div className="flex justify-center gap-[28px]">
                    <Image alt='logo_big' width={48} height={48} src="/static/logo_small.svg" className="h-[48px]" />
                    <div className="flex gap-[7px] items-center">
                        <div className="flex w-[10px] h-[10px] rounded-[10px] bg-accent-aux-1">
                        </div>
                        <div className="flex w-[10px] h-[10px] rounded-[10px] bg-accent-aux-1">
                        </div>
                        <div className="flex w-[10px] h-[10px] rounded-[10px] bg-accent-aux-1">
                        </div>
                    </div>
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" fill="currentColor" viewBox="0 0 20 20"><g clip-path="url(#clip0_6766_653)"><path d="M17.784 10a7.784 7.784 0 11-15.568 0 7.784 7.784 0 0115.568 0z" fill="#fff"></path><path d="M13.27 14.587l1.64-7.734c.146-.68-.245-.949-.691-.782L4.576 9.788c-.659.256-.647.625-.112.792l2.467.77 5.725-3.605c.268-.179.514-.078.313.1l-4.631 4.186-.179 2.545c.257 0 .369-.112.502-.246l1.205-1.16 2.5 1.84c.458.257.782.124.905-.424l-.001.001zM20 10c0 5.524-4.476 10-10 10S0 15.524 0 10 4.476 0 10 0s10 4.476 10 10z" fill="#57A6DE"></path></g><defs><clipPath id="clip0_6766_653"><rect width="20" height="20" fill="#fff"></rect></clipPath></defs></svg>
                    </div>
                </div>
                <div className="flex mt-[36px] font-[14px] gap-[2px] justify-center text-accent-aux-1">To use the
                    <div className="flex text-[14px] font-[500] text-accent-green">Auto Trading</div>
                </div>
                <div className="flex tex-[14px] justify-center text-accent-aux-1">link your TGBot Wallet </div>
            </div>
            <div className="flex justify-center w-full">
                <button type="button" className="inline-flex w-full appearance-none items-center justify-center select-none relative whitespace-nowrap leading-[1.2] min-w-[2.5rem] px-[1rem] py-[1rem] dark:bg-[#f5f5f5] dark:text-black text-[14px] rounded-[8px] font-[500]">Connect Telegram</button>
            </div>
        </div>
    )
}

export function Metric() {
    return (
        <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px]">
            <div className="bg-transparent rounded-[12px] inline-flex items-center flex-wrap gap-[0px] w-full">
                <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-r border-accent-3">
                    <div className="flex justify-center dark:text-[#9AA0AA] w-full">1m</div>
                    <div className="text-[12px] flex dark:text-[9AA0AA]">
                        <div className="flex text-accent-green w-full justify-center font-[500]">+0.87%</div>
                    </div>
                </div>
                <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-r border-accent-3">
                    <div className="flex justify-center dark:text-[#9AA0AA] w-full">5m</div>
                    <div className="text-[12px] flex dark:text-[9AA0AA]">
                        <div className="flex text-accent-green w-full justify-center font-[500]">+4.87%</div>
                    </div>
                </div>
                <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b border-r border-accent-3">
                    <div className="flex justify-center dark:text-[#9AA0AA] w-full">1h</div>
                    <div className="text-[12px] flex dark:text-[9AA0AA]">
                        <div className="flex text-accent-red w-full justify-center font-[500]">-12.87%</div>
                    </div>
                </div>
                <div className="flex flex-col bg-transparent w-[20%] flex-grow justify-center text-accent-aux-1 cursor-pointer text-[12px] items-center h-[54px] flex-nowrap rounded-tl-[12px] rounded-tr-0 border-b  border-accent-3">
                    <div className="flex justify-center dark:text-[#9AA0AA] w-full">24h</div>
                    <div className="text-[12px] flex dark:text-[9AA0AA]">
                        <div className="flex text-accent-green w-full justify-center font-[500]">+223.7%</div>
                    </div>
                </div>
            </div>

            {/* bottom side */}
            <div className="flex justify-between pb-[8px] px-[12px] text-[12px] mt-[6px]">
                <div className="flex flex-col gap-4">
                    <div className="flex text-accent-aux-1 justify-start w-full">Vol</div>
                    <div className="flex w-full justify-start font-[500]">$21.1K</div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex text-accent-aux-1 justify-start w-full">Buys</div>
                    <div className="flex w-full text-accent-green justify-start font-[500]">$21.1K</div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex text-accent-aux-1 justify-start w-full">Sells</div>
                    <div className="flex w-full text-accent-red justify-start font-[500]">$21.1K</div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex text-accent-aux-1 justify-start w-full">Net Buy</div>
                    <div className="flex w-full justify-start font-[500] text-accent-green">$21.1K</div>
                </div>
            </div>
        </div>
    )
}


export function PoolInfo() {
    return (
        <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
            <div className="w-full flex justify-between items-center pb-2">
                <h2 className='text-white text-[14px]'>Pool info</h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#9AA0AA" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zM6.465 5.501a.386.386 0 00-.266.11L4.39 7.42a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.109l1.81-1.81a.188.188 0 00-.133-.32H6.465zm0 6.758a.376.376 0 00-.266.11l-1.81 1.81a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.11l1.81-1.81a.188.188 0 00-.133-.32H6.465zm7.487-3.289a.376.376 0 00-.266-.11H4.522a.188.188 0 00-.133.321l1.81 1.81c.07.07.165.11.266.11h9.164a.188.188 0 00.133-.32l-1.81-1.81z"></path></svg>
            </div>
            <div className="w-full text-[12px] dark:text-[#9AA0AA] space-y-2">
                <div className="flex w-full justify-between item-center ">
                    <p className=''>Total liq</p>
                    <p className='flex items-center'>
                        $375k(807.12 SOL)
                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#88D693" viewBox="0 0 12 12"><path d="M8.333 4.667h-.38v-.762A1.887 1.887 0 006.047 2a1.887 1.887 0 00-1.904 1.905v.762h-.381A.764.764 0 003 5.43v3.81c0 .418.343.761.762.761h4.571c.42 0 .762-.343.762-.761v-3.81a.764.764 0 00-.762-.762zM6.047 8.096a.765.765 0 01-.761-.762c0-.42.343-.763.761-.763.42 0 .763.344.763.763 0 .419-.343.762-.763.762zM7.23 4.667H4.867v-.762c0-.648.533-1.18 1.18-1.18.649 0 1.182.532 1.182 1.18v.762z"></path></svg>
                    </p>
                </div>
                <div className="flex w-full justify-between item-center ">
                    <p className=''>Market Cap</p>
                    <p className='flex items-center'>
                        $3M
                    </p>
                </div>
                <div className="flex w-full justify-between item-center ">
                    <p className=''>Holders</p>
                    <p className='flex items-center'>
                        9601
                    </p>
                </div>

                <div className="flex w-full justify-between item-center ">
                    <p className=''>Total supply</p>
                    <p className='flex items-center'>
                        {formatNumber(9996000)}
                    </p>
                </div>

                <div className="flex w-full justify-between item-center ">
                    <p className=''>Pair</p>
                    <p className='flex items-center'>
                        <span>{truncAddress("FAipEikduejyyr5Z")}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => copyToClipboard("FAipEikduejyyr5Z")} width="12px" height="12px" fill="#5C6068" viewBox="0 0 12 12"><g clipPath="url(#clip0_6972_490)"><path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"></path><path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"></path></g><defs><clipPath id="clip0_6972_490"><rect width="12" height="12"></rect></clipPath></defs></svg>
                    </p>
                </div>

                <div className="flex w-full justify-between item-center ">
                    <p className=''>Token creator</p>
                    <p className='flex items-center'>
                        <span>{truncAddress("C4udFGorfjenrindfiU")}</span>
                        <span>(2.5SOL)</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => copyToClipboard("FAipEikduejyyr5Z")} width="12px" height="12px" fill="#5C6068" viewBox="0 0 12 12"><g clipPath="url(#clip0_6972_490)"><path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"></path><path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"></path></g><defs><clipPath id="clip0_6972_490"><rect width="12" height="12"></rect></clipPath></defs></svg>
                    </p>
                </div>

                <div className="flex w-full justify-between item-center ">
                    <p className=''>Pool created</p>
                    <p className='flex items-center'>
                        01/22/2025 11:09
                    </p>
                </div>
            </div>
        </div>
    )
}


export function DegenAudit() {
    return (
        <div className="flex mt-3 w-full flex-col bg-accent-search rounded-[12px] p-[12px]">
            <div className="w-full flex justify-between items-center pb-2">
                <h2 className='text-white text-[14px]'>Degen Audit</h2>
            </div>
            <div className="w-full text-[12px] dark:text-[#9AA0AA] space-y-2">
                <div className="flex w-full justify-between item-center ">
                    <p className=''>NoMint</p>
                    <div className='flex items-center gap-1'>
                        <p className='text-prettyGreen'>Yes</p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#88D693" viewBox="0 0 14 14"><path d="M12.956 2.686C9.51 1.576 7.002.031 7.002.031h-.004s-2.47 1.564-5.952 2.655c0 0-.662 7.75 5.935 11.283h.037c6.6-3.532 5.938-11.283 5.938-11.283zM10.044 5.34L7.233 9.025a.566.566 0 01-.85.056L4.598 7.292a.567.567 0 11.803-.8L6.726 7.82l2.417-3.168a.567.567 0 01.9.687z"></path></svg>
                        </p>
                    </div>
                </div>
                <div className="flex w-full justify-between item-center ">
                    <p className=''>Blacklist</p>
                    <div className='flex items-center gap-1'>
                        <p className='text-prettyGreen'>No</p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#88D693" viewBox="0 0 14 14"><path d="M12.956 2.686C9.51 1.576 7.002.031 7.002.031h-.004s-2.47 1.564-5.952 2.655c0 0-.662 7.75 5.935 11.283h.037c6.6-3.532 5.938-11.283 5.938-11.283zM10.044 5.34L7.233 9.025a.566.566 0 01-.85.056L4.598 7.292a.567.567 0 11.803-.8L6.726 7.82l2.417-3.168a.567.567 0 01.9.687z"></path></svg>
                        </p>
                    </div>
                </div>

                <div className="flex w-full justify-between item-center ">
                    <p className=''>Burnt</p>
                    <div className='flex items-center gap-1'>
                        <p className='text-prettyGreen'>No</p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#88D693" viewBox="0 0 14 14"><path d="M12.956 2.686C9.51 1.576 7.002.031 7.002.031h-.004s-2.47 1.564-5.952 2.655c0 0-.662 7.75 5.935 11.283h.037c6.6-3.532 5.938-11.283 5.938-11.283zM10.044 5.34L7.233 9.025a.566.566 0 01-.85.056L4.598 7.292a.567.567 0 11.803-.8L6.726 7.82l2.417-3.168a.567.567 0 01.9.687z"></path></svg>
                        </p>
                    </div>
                </div>

                <div className="flex w-full justify-between item-center ">
                    <p className=''>Top 10</p>
                    <div className='flex items-center gap-1'>
                        <p className='text-prettyGreen'>13%</p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#88D693" viewBox="0 0 14 14"><path d="M12.956 2.686C9.51 1.576 7.002.031 7.002.031h-.004s-2.47 1.564-5.952 2.655c0 0-.662 7.75 5.935 11.283h.037c6.6-3.532 5.938-11.283 5.938-11.283zM10.044 5.34L7.233 9.025a.566.566 0 01-.85.056L4.598 7.292a.567.567 0 11.803-.8L6.726 7.82l2.417-3.168a.567.567 0 01.9.687z"></path></svg>
                        </p>
                    </div>
                </div>


            </div>
        </div>
    )
}