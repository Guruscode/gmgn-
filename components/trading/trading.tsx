"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { copyToClipboard, formatNumber, truncAddress } from '@/lib/utils'
import AuthLayout from '../common/authLayout';

export default function TradingHeader() {
    const [showAuth, setShowAuth] = useState(false)

    return (
        <>
            <div className="flex w-full justify-between items-center px-[12px] h-[57px] bg-[#111111]">
                <div className="flex flex-col">
                    <div className="flex items-center flex-grow flex-shrink">
                        <div className="flex" onClick={() => setShowAuth(true)}>
                            <div className="cursor-pointer flex mr-[6px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="#5C6068" viewBox="0 0 16 16"><g clipPath="url(#clip0_6939_489)"><path fillRule="evenodd" clipRule="evenodd" d="M6.421.99a1.754 1.754 0 013.158 0l1.587 3.127 3.352.603c1.414.254 1.976 2.051.975 3.121l-2.37 2.536.484 3.5c.204 1.477-1.267 2.587-2.554 1.93L8 14.245l-3.053 1.56c-1.287.658-2.758-.452-2.554-1.929l.484-3.5L.507 7.84c-1-1.07-.439-2.867.975-3.121l3.352-.603L6.421.99z"></path></g><defs><clipPath id="clip0_6939_489"><rect width="16" height="16"></rect></clipPath></defs></svg>
                            </div>
                        </div>

                        <div role="button" className="flex items-center md:w-[290px] w-[136px] md:flex-[290px] flex-[136px]">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <div className="rounded-full border w-fit relative">
                                        <Image src={"/static/3717.png"} className='md:min-w-[40px] min-w-[30px] md:h-[40px] h-[30px]' width={40} height={40} alt='' />
                                        <Image src={"/static/ether.webp"} className='md:min-w-[15px] min-w-[10px] md:h-[15px] h-[10px] absolute bottom-0 right-0' width={15} height={15} alt='' />
                                    </div>
                                    <div className="">
                                        {/* meme name */}
                                        <div className="flex items-center gap-1">
                                            <div className="flex gap-1 items-center">
                                                <h1 className="uppercase md:text-[14px] text-[13px] font-[400]">Stars</h1>
                                                <TooltipProvider >
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <p className='text-[12px] text-accent-1'>Li star</p>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='bg-accent-3 text-[#111111] text-[12px] font-[400]'>
                                                            <p className="">living stars</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                            <div className="flex gap-1">

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#88D693" viewBox="0 0 16 16"><path d="M10.134 16a.428.428 0 01-.222-.054.401.401 0 01-.157-.158.28.28 0 01-.007-.22.299.299 0 01.157-.163 4.64 4.64 0 001.653-1.616c.4-.662.616-1.41.63-2.174.011-1.258-.535-3.162-3.081-5.311a9.526 9.526 0 01-1.34 5.042.432.432 0 01-.194.15.456.456 0 01-.25.022.379.379 0 01-.218-.095.347.347 0 01-.112-.203 3.395 3.395 0 00-.985-1.944 11.36 11.36 0 01-.666 1.413 4.578 4.578 0 00-.727 2.406c0 .795.799 1.721 1.573 2.213.06.024.113.065.15.117a.317.317 0 01.06.175.357.357 0 01-.135.239.393.393 0 01-.273.08h-.012a.525.525 0 01-.132-.016C2.723 15.045 1 13.296 1 10.98c0-1.966 1.129-3.55 2.318-5.225A16.86 16.86 0 006.206.26a.358.358 0 01.101-.157.385.385 0 01.17-.09.495.495 0 01.402.075C12.536 4.263 15.4 7.093 15.4 10.946c0 2.533-2.24 4.705-5.206 5.054h-.06z"></path></svg>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='bg-accent-3 text-[#111111] text-[12px] font-[400]'>
                                                            <p>Search on twitter</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#88D693" viewBox="0 0 16 16"><g clipPath="url(#clip0_8532_4982)"><rect x="10.5" y="-1.5" width="9.296" height="16.971" rx="4.648" transform="rotate(45 10.5 -1.5)" fill="#fff"></rect><path d="M4.703 4.297L1.786 7.213a4.648 4.648 0 106.574 6.574l2.916-2.917-6.573-6.573z" fill="#52D48F"></path><path d="M7.865 13.291A3.948 3.948 0 112.28 7.708l5.427-5.426a3.948 3.948 0 115.583 5.583L7.865 13.29zm5.921-11.504a4.648 4.648 0 00-6.573 0L1.787 7.213a4.648 4.648 0 106.573 6.574l5.427-5.427a4.648 4.648 0 000-6.573z" fill="#044735"></path></g><defs><clipPath id="clip0_8532_4982"><rect width="16" height="16" fill="#fff"></rect></clipPath></defs></svg>


                                                {/* dexscreener */}
                                                <a href="dexscreener" className="md:block hidden">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#6E727D" viewBox="0 0 12 12"><g clipPath="url(#clip0_8943_578)" fillRule="evenodd" clipRule="evenodd"><path d="M5.712 3.75l-.103-.055a3.638 3.638 0 00-.218-.11 1.003 1.003 0 00-.547-.057.954.954 0 00-.404.155l-.018.011a.359.359 0 00-.05.035c-.037.034-.072.014-.102-.003l-.007-.004-.03-.016a7.402 7.402 0 01-.414-.236 9.773 9.773 0 01-.596-.394 6.638 6.638 0 01-.524-.428 16.372 16.372 0 01-.659-.628 3.815 3.815 0 01-.331-.39 5.854 5.854 0 01-.348-.504c-.06-.1-.108-.208-.156-.316a7.578 7.578 0 00-.056-.123c-.004-.009-.003-.02-.002-.034l.001-.026.059.064.087.097c.159.176.352.304.565.403.023.01.049.017.075.022l.05.013c.095.03.154-.022.213-.076l.027-.024.113-.098c.114-.1.228-.2.35-.289.119-.085.246-.156.374-.227L3.155.46c.09-.05.182-.097.278-.136.113-.046.23-.084.346-.123l.017-.005c.092-.03.186-.057.28-.082.057-.015.114-.027.172-.036a5.25 5.25 0 01.254-.031l.102-.01C4.736.023 4.868.009 5 0c.068-.004.138.004.207.011l.032.004c.148.016.297.034.445.054h.002c.081.01.164.022.243.04.086.02.17.046.253.072l.021.006.02.007a4.126 4.126 0 01.575.22 3.903 3.903 0 011.064.76c.068.072.142.067.211.043.115-.04.226-.093.33-.154.19-.111.34-.268.478-.438l.014.006a1.319 1.319 0 00-.011.037.595.595 0 01-.029.08l-.034.075c-.04.085-.079.17-.127.25-.1.165-.204.327-.319.481a7.506 7.506 0 01-.395.483 5.117 5.117 0 01-.326.328 7.705 7.705 0 01-.902.746c-.25.172-.507.334-.764.495-.054.035-.113.062-.172.089a3.056 3.056 0 00-.086.04c-.01.005-.018.013-.018.013zm1.905 2.515a2.98 2.98 0 011.472-.23 18.284 18.284 0 01-.014-.507c-.004-.38-.005-.762-.005-1.143l-.001-.494a.409.409 0 00-.005-.063 27.681 27.681 0 00-.086-.503l-.004-.018a.885.885 0 00-.024-.102l-.045-.13-.037-.107a2.127 2.127 0 01-.024-.078 1.24 1.24 0 00-.043-.13 7.896 7.896 0 00-.169-.37c-.02-.04-.042-.08-.065-.118l-.031-.053-.541.654-.12.144c.012.025.023.052.034.08.025.061.052.126.081.19.065.14.097.288.107.44a1.212 1.212 0 01-.275.851c-.185.22-.424.365-.698.446a1.363 1.363 0 01-.447.067c-.096-.004-.096 0-.084.09v.006l.01.129c.008.108.016.217.02.326a.091.091 0 00.053.085l.142.08c.101.056.202.112.302.17.166.095.332.19.497.288zM5.84 8.609l-.01.028-.012.03c-.034.088-.068.176-.1.265l-.06.17-.018.052-.016.048c-.019.055-.038.109-.055.164l-.037.125c-.01.035-.02.07-.032.105l-.035.112-.045.146-.031.11a4.023 4.023 0 01-.073.24c-.014.044-.03.088-.042.132-.013.044-.024.088-.035.133l-.031.118-.05.167-.035.112c-.01.031-.018.063-.027.094l-.036.122a.658.658 0 01-.037.093h-.017l-.116-.398-.068-.233-.053-.18-.027-.09-.074-.247a14.114 14.114 0 00-.036-.115l-.036-.115-.032-.108-.046-.15c-.01-.034-.022-.067-.034-.1v-.001a4.068 4.068 0 01-.061-.196 1.833 1.833 0 00-.041-.135c-.027-.073-.055-.146-.084-.218a12.408 12.408 0 01-.1-.263 3.793 3.793 0 00-.08-.213 6.031 6.031 0 00-.382-.749 1.757 1.757 0 00-.176-.253 2.362 2.362 0 00-.294-.293c-.065-.052-.14-.092-.214-.132l-.09-.049-.446-.254-.062-.035-.24-.136-.109-.062.135-.08.076-.046.143-.085.188-.105c.068-.038.137-.075.205-.114l.18-.105c.087-.051.173-.102.26-.15.083-.046.149-.094.122-.202v-.006l.035-.409c.003-.033.002-.06-.045-.058a1.56 1.56 0 01-.545-.086 1.502 1.502 0 01-.446-.236 1.294 1.294 0 01-.275-.291 1.05 1.05 0 01-.191-.493 1.346 1.346 0 01.019-.46c.033-.138.078-.27.146-.395.058-.107.057-.116-.025-.207l-.092-.101a6.186 6.186 0 01-.219-.246 4.585 4.585 0 01-.247-.33c-.02-.029-.04-.028-.056-.001a1.28 1.28 0 00-.06.118l-.017.036a9.05 9.05 0 00-.11.245 2.95 2.95 0 00-.178.499l-.007.021c-.025.09-.05.181-.068.273-.018.088-.028.178-.039.267v.008l-.016.123c-.015.11-.03.22-.03.33-.005.326-.005.651-.004.976v.534a8.565 8.565 0 01-.041 1.008l-.001.015-.019.13a36.369 36.369 0 00-.047.343l-.019.147-.001.01c-.01.06-.018.12-.03.18l-.102.442-.011.046a2.21 2.21 0 01-.039.148c-.02.068-.043.137-.064.205l-.04.127-.031.102a4.136 4.136 0 01-.21.567 7.12 7.12 0 01-.134.306c-.028.06-.059.12-.089.18l-.064.126c-.002.006 0 .014.002.023l.002.015.056-.043.105-.083c.088-.07.176-.142.263-.214h.002l.263-.214.204-.164c.14-.112.28-.224.418-.338.036-.03.047-.023.067.01.11.182.219.364.33.545.108.176.217.352.327.527l.022.036.197.313.08.126 1.03-.967L5.014 12l1.071-1.738A2.978 2.978 0 015.84 8.61zm-2.384-2.18l.136-.081c.09-.054.181-.109.272-.162.016-.01.032-.018.047-.026.025-.013.05-.025.072-.041a.19.19 0 00.085-.16l-.001-.095c-.001-.06-.002-.12 0-.18l.003-.056c.005-.126.01-.252.027-.376a1.57 1.57 0 01.08-.299c.033-.096.072-.191.12-.28.099-.183.243-.331.423-.43a.574.574 0 01.552-.017c.206.1.353.26.468.453.074.123.119.256.154.396.068.264.069.53.064.798-.003.17.044.228.18.304l.124.07.206.116.032.02c.016.01.032.02.049.028.043.02.033.04 0 .06a2.395 2.395 0 00-.635.547c-.13.161-.242.333-.34.514a4.05 4.05 0 00-.173.384l-.015.037a9.5 9.5 0 00-.168.444c-.023.064-.041.128-.06.193a5.611 5.611 0 01-.103.323l-.036.11a7.995 7.995 0 00-.025-.067c-.017-.043-.031-.08-.044-.119a22.49 22.49 0 01-.095-.292l-.017-.054-.031-.1c-.022-.07-.043-.14-.069-.209a5.83 5.83 0 00-.12-.29l-.018-.04-.03-.072c-.041-.094-.082-.188-.128-.279-.052-.1-.111-.197-.175-.29a2.55 2.55 0 00-.372-.433 2.16 2.16 0 00-.414-.307c-.01-.006-.023-.01-.034-.013a.415.415 0 01-.015-.005l.012-.012.012-.012zm.455-2.112c-.044.024-.084.046-.128.058-.16.046-.324.084-.492.059-.25-.039-.48-.118-.623-.35a.497.497 0 01-.058-.422l.063-.207c.413.324.84.59 1.306.826l-.062.033-.006.003zm2.144-.036a7.913 7.913 0 001.296-.819c.085.167.122.336.068.512a.577.577 0 01-.252.311.964.964 0 01-.652.147c-.09-.011-.178-.04-.265-.069a4.07 4.07 0 00-.093-.03c-.02-.005-.04-.017-.063-.03a1.038 1.038 0 00-.039-.022z"></path><path d="M8.196 6.998a2.371 2.371 0 012.905.938 2.368 2.368 0 01.326.886c.011.071.02.14.025.209h.211c.08 0 .15.03.204.077.05.044.085.098.107.155.025.067.03.135.023.2a.487.487 0 01-.083.215c-.058.087-.13.198-.217.333-.093.144-.207.3-.344.466a.552.552 0 01-.176.15.4.4 0 01-.234.037.356.356 0 01-.245-.14.956.956 0 00-.088-.098 2.451 2.451 0 01-.205-.234 5.724 5.724 0 01-.377-.55.48.48 0 01-.08-.207.402.402 0 01.022-.193.34.34 0 01.108-.148.297.297 0 01.182-.063h.237a1.525 1.525 0 00-.431-.859 1.228 1.228 0 00-.447-.288 1.435 1.435 0 00-1.05.014 1.312 1.312 0 00-.447.297 1.425 1.425 0 00-.309.462c-.075.18-.116.363-.124.551-.008.187.019.368.08.543.058.169.152.313.281.435.125.114.247.202.365.265.124.065.241.111.353.14.115.028.22.04.318.038.107-.003.201-.015.284-.035a.95.95 0 00.218-.078.628.628 0 00.137-.09l.017-.016.019-.011a.677.677 0 01.319-.093c.14-.006.264.05.359.148.106.107.173.253.13.419a.698.698 0 01-.342.422 1.81 1.81 0 01-.694.296c-.251.05-.504.053-.758.01a2.581 2.581 0 01-1.37-.715 2.317 2.317 0 01-.522-.787 2.388 2.388 0 011.313-3.101z"></path></g><defs><clipPath id="clip0_8943_578"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <div className="text-[#9AA0AA] text-[12px]">6d</div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <div className='text-gRed font-[400] flex items-center gap-1 text-[12px]'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path d="M15 6A5 5 0 115 6a5 5 0 0110 0z"></path><path d="M10 8.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path><path d="M19 8.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path><path d="M5 8a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H5zm1.7 8h6.6a.7.7 0 110 1.4H6.7a.7.7 0 110-1.4z"></path></svg>
                                                            <span>Run</span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] dark:text-white text-[#111111] text-[12px] font-[400]'>
                                                        <p>Dev Sell All</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <div className="md:flex hidden items-center gap-1`">
                                                <p className='text-accent-aux-1 text-[12px]'>{truncAddress("0xi82984384")}</p>
                                                <button onClick={() => copyToClipboard("0x2893i483494")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12"><g clipPath="url(#clip0_6972_490)"><path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"></path><path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"></path></g><defs><clipPath id="clip0_6972_490"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                                </button>
                                            </div>


                                            {/* x - twitter */}

                                            <a href='' target='_blank' className="hidden md:block text-accent-aux-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 12 12"><g clipPath="url(#clip0_7920_513)"><path d="M9.282 1h1.71L7.255 5.27l4.394 5.809H8.21L5.515 7.555 2.43 11.08H.721l3.995-4.567L.5 1h3.528l2.436 3.22L9.282 1zm-.6 9.056h.947L3.513 1.97H2.497l6.185 8.086z"></path></g><defs><clipPath id="clip0_7920_513"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                            </a>

                                            {/* web - their site */}

                                            <a href='' target='_blank' className="hidden md:block text-accent-aux-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 20 20"><g clipPath="url(#clip0_1553_2200)"><path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM6.446 2.831A8.037 8.037 0 003.07 6h2.323c.212-1.023.505-1.96.865-2.77.06-.136.123-.269.188-.399zM2 10c0-.69.088-1.36.252-2h2.842a21.008 21.008 0 000 4H2.252A8.013 8.013 0 012 10zm1.07 4a8.037 8.037 0 003.376 3.169 9.877 9.877 0 01-.188-.399c-.36-.81-.653-1.747-.865-2.77H3.07zm4.372 0c.173.732.392 1.392.643 1.958.328.738.693 1.273 1.047 1.61.35.333.641.432.868.432.227 0 .518-.1.867-.432.355-.337.72-.872 1.048-1.61.251-.566.47-1.226.643-1.958H7.442zm7.165 0a13.716 13.716 0 01-.865 2.77c-.06.136-.123.269-.188.399A8.037 8.037 0 0016.93 14h-2.323zm3.14-2h-2.841a21.027 21.027 0 000-4h2.842c.165.64.252 1.31.252 2s-.087 1.36-.252 2zm-4.851 0H7.104A18.907 18.907 0 017 10c0-.693.037-1.362.104-2h5.792c.067.638.104 1.307.104 2 0 .693-.037 1.362-.104 2zm1.71-6h2.324a8.037 8.037 0 00-3.376-3.169c.065.13.128.263.188.399.36.81.653 1.747.865 2.77zm-6.52-1.958c-.252.566-.47 1.226-.644 1.958h5.116a11.248 11.248 0 00-.643-1.958c-.328-.738-.693-1.273-1.047-1.61C10.518 2.099 10.226 2 10 2c-.227 0-.518.1-.868.432-.354.337-.719.872-1.047 1.61z"></path></g><defs><clipPath id="clip0_1553_2200"><rect width="20" height="20"></rect></clipPath></defs></svg>
                                            </a>

                                            {/* telegram */}

                                            <a href='' target='_blank' className="hidden md:block text-accent-aux-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 12 12"><g clipPath="url(#clip0_7920_515)"><path d="M11.894 1.91l-1.8 8.487c-.134.6-.49.746-.992.465L6.36 8.842l-1.322 1.273c-.147.147-.27.27-.551.27l.196-2.793L9.764 3c.22-.196-.05-.307-.344-.11L3.138 6.844.43 6c-.588-.183-.6-.588.122-.869l10.582-4.078c.49-.183.918.11.76.857z"></path></g><defs><clipPath id="clip0_7920_515"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                            </a>

                                            {/* chain */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className='text-accent-aux-1' width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zM6.465 5.501a.386.386 0 00-.266.11L4.39 7.42a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.109l1.81-1.81a.188.188 0 00-.133-.32H6.465zm0 6.758a.376.376 0 00-.266.11l-1.81 1.81a.188.188 0 00.133.32h9.164c.101 0 .197-.04.266-.11l1.81-1.81a.188.188 0 00-.133-.32H6.465zm7.487-3.289a.376.376 0 00-.266-.11H4.522a.188.188 0 00-.133.321l1.81 1.81c.07.07.165.11.266.11h9.164a.188.188 0 00.133-.32l-1.81-1.81z"></path></svg>

                                            {/* Share */}
                                            <div className="flex text-accent-aux-1 items-center text-[12px]">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M4 6a2 2 0 012-2h2a1 1 0 000-2H6a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4v-2a1 1 0 10-2 0v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm7-3a1 1 0 011-1h4a2 2 0 012 2v4a1 1 0 11-2 0V5.414l-5.293 5.293a1 1 0 01-1.414-1.414L14.586 4H12a1 1 0 01-1-1z"></path></svg>
                                                <p>share</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col mr-[16px]">
                        <div className="flex h-[24px] text-[16px] font-[500] text-gRed">$0.00345921</div>
                        <div className="w-full flex justify-end items-center gap-1 text-[12px]">
                            <p className='text-accent-aux-1'>24h</p>
                            <p className='text-gGreen'>+{formatNumber(1300)}%</p>
                        </div>
                    </div>

                    <div className="flex items-center text-[12px] text-[400] gap-3">
                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>Sniper {">"}</p>
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><rect x="8" y="1" width="4" height="2" fill="#FFCF39"></rect><rect x="19" y="8" width="4" height="2" transform="rotate(90 19 8)" fill="#FFCF39"></rect><rect x="3" y="8" width="4" height="2" transform="rotate(90 3 8)" fill="#FFCF39"></rect><rect x="8" y="17" width="4" height="2" fill="#FFCF39"></rect><circle cx="10" cy="10.001" r="2.7" fill="#FFCF39"></circle><path fillRule="evenodd" clipRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1116 0 8 8 0 01-16 0z" fill="#FFCF39"></path></svg>
                                <div className="flex items-center text-[13px]">
                                    <span>0</span>
                                    <span>/</span>
                                    <span>70</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>BlueChip {">"}</p>
                            <div className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M16.102 9.215a8.041 8.041 0 00-8.365 0L5.966 5.998a11.44 11.44 0 015.954-1.67c2.168 0 4.201.608 5.953 1.67l-1.771 3.218z" fill="url(#paint0_linear_2044_2363)"></path><path d="M6.776 9.901C4.808 11.51 3.542 14.02 3.542 16.84c0 1.026-.793 1.858-1.771 1.858C.793 18.697 0 17.865 0 16.84c0-4.196 1.97-7.91 4.993-10.178l1.783 3.24z" fill="#F04866"></path><path d="M20.296 16.84c0-2.82-1.265-5.33-3.233-6.939l1.782-3.24c3.023 2.268 4.993 5.982 4.993 10.178 0 1.026-.793 1.858-1.77 1.858-.979 0-1.772-.832-1.772-1.858z" fill="#62BA01"></path><path d="M6.001 15.85l5.818-.085a1.65 1.65 0 11-.822 3.066l-4.996-2.982z" fill="#F04866"></path><defs><linearGradient id="paint0_linear_2044_2363" x1="17.096" y1="7.441" x2="8.112" y2="7.441" gradientUnits="userSpaceOnUse"><stop stopColor="#E6D119"></stop><stop offset="1" stopColor="#E6AC19"></stop></linearGradient></defs></svg>
                                <p className='text-[13px]'>1.2%</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>Top 10 {">"}</p>
                            <div className="flex items-center gap-1">
                                <div className="flex text-[13px] items-center text-accent-green">
                                    12.5%
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className='text-accent-aux-1'>Audit {">"}</p>
                            <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-1 text-[13px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#88D693" viewBox="0 0 14 14"><path d="M12.956 2.686C9.51 1.576 7.002.031 7.002.031h-.004s-2.47 1.564-5.952 2.655c0 0-.662 7.75 5.935 11.283h.037c6.6-3.532 5.938-11.283 5.938-11.283zM10.044 5.34L7.233 9.025a.566.566 0 01-.85.056L4.598 7.292a.567.567 0 11.803-.8L6.726 7.82l2.417-3.168a.567.567 0 01.9.687z"></path></svg>
                                        <p className='text-accent-green'>Safe</p>
                                        <p className='h-[18px] min-w-[30px] text-accent-green text-center text-[12px] rounded-[4px] bg-[rgba(136,214,147,0.2)]'>4/4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showAuth && <AuthLayout showAuth={showAuth} setAuthModal={setShowAuth} />
            }
        </>
    )
}
