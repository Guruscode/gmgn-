import { copyToClipboard, formatNumber, truncAddress } from '@/lib/utils'
import React, { useCallback } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { memeCoinsInterface } from '@/lib/faker-data'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'


export default function SingleFeed({ memeData }: { memeData: memeCoinsInterface }) {
    const chain = useSearchParams()
    const getChain = useCallback(() => chain.get("chain"), [chain]);
    return (
        <>
            <a href={`/eth/token/${memeData.id}`} className='w-full flex items-center gap-3 mt-5 border-b px-4 py-2'>
                <div className="min-w-[40px]  min-h-[40px]  text-[rgb(219,222,230)] rounded-[54px] relative flex justify-center item-center">
                    <div className="">
                        <a className='absolute hover:opacity-65 duration-200 bg-accent-2 text-[#111] opacity-0 inset h-full w-full flex justify-center items-center z-1 text-[10px]' target='_parent' href="https://lens.google.com/uploadbyurl?url=https://dd.dexscreener.com/ds-data/tokens/ethereum/0x20c861450ca31429f9504397fddbe2d4be3615f1.png">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.8a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zM1.2 7.5a6.3 6.3 0 1112.6 0 6.3 6.3 0 01-12.6 0z"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.934 10.934a.8.8 0 011.132 0l3 3a.8.8 0 11-1.132 1.132l-3-3a.8.8 0 010-1.132z"></path></svg>
                        </a>
                        <Image src={memeData.image} className='w-full h-full' width={40} height={40} alt="" />
                    </div>
                </div>
                <div className="w-full space-y-1">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-1">
                            <div className="font-[500] text-[14px]">{memeData.name}</div>
                            <div className="text-[#6E767D] text-[12px]">{memeData.handle}</div>
                            <div className="flex gap-1">

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <a href="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12"><g clipPath="url(#clip0_9095_133)"><path d="M5.406 0a5.355 5.355 0 015.351 5.425c-.026 2.942-2.46 5.334-5.402 5.312A5.385 5.385 0 010 5.299C.031 2.349 2.44-.011 5.406 0zm-.043 9.457a4.105 4.105 0 004.13-4.059c.03-2.269-1.848-4.151-4.133-4.143a4.112 4.112 0 00-4.087 4.107 4.091 4.091 0 004.09 4.095z"></path><path d="M10.843 11.676l-.93-.93a.562.562 0 010-.792l.041-.04a.562.562 0 01.792 0l.93.93a.562.562 0 010 .792l-.04.04a.562.562 0 01-.793 0z"></path></g><defs><clipPath id="clip0_9095_133"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-accent-3 text-[#111111] text-[12px] font-[400]'>
                                            <p>Search on twitter</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 16 16"><g clipPath="url(#clip0_6939_489)"><path fillRule="evenodd" clipRule="evenodd" d="M6.421.99a1.754 1.754 0 013.158 0l1.587 3.127 3.352.603c1.414.254 1.976 2.051.975 3.121l-2.37 2.536.484 3.5c.204 1.477-1.267 2.587-2.554 1.93L8 14.245l-3.053 1.56c-1.287.658-2.758-.452-2.554-1.929l.484-3.5L.507 7.84c-1-1.07-.439-2.867.975-3.121l3.352-.603L6.421.99z"></path></g><defs><clipPath id="clip0_6939_489"><rect width="16" height="16"></rect></clipPath></defs></svg>
                                </a>

                                {/* dexscreener */}
                                <a href="dexscreener">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#6E727D" viewBox="0 0 12 12"><g clipPath="url(#clip0_8943_578)" fillRule="evenodd" clipRule="evenodd"><path d="M5.712 3.75l-.103-.055a3.638 3.638 0 00-.218-.11 1.003 1.003 0 00-.547-.057.954.954 0 00-.404.155l-.018.011a.359.359 0 00-.05.035c-.037.034-.072.014-.102-.003l-.007-.004-.03-.016a7.402 7.402 0 01-.414-.236 9.773 9.773 0 01-.596-.394 6.638 6.638 0 01-.524-.428 16.372 16.372 0 01-.659-.628 3.815 3.815 0 01-.331-.39 5.854 5.854 0 01-.348-.504c-.06-.1-.108-.208-.156-.316a7.578 7.578 0 00-.056-.123c-.004-.009-.003-.02-.002-.034l.001-.026.059.064.087.097c.159.176.352.304.565.403.023.01.049.017.075.022l.05.013c.095.03.154-.022.213-.076l.027-.024.113-.098c.114-.1.228-.2.35-.289.119-.085.246-.156.374-.227L3.155.46c.09-.05.182-.097.278-.136.113-.046.23-.084.346-.123l.017-.005c.092-.03.186-.057.28-.082.057-.015.114-.027.172-.036a5.25 5.25 0 01.254-.031l.102-.01C4.736.023 4.868.009 5 0c.068-.004.138.004.207.011l.032.004c.148.016.297.034.445.054h.002c.081.01.164.022.243.04.086.02.17.046.253.072l.021.006.02.007a4.126 4.126 0 01.575.22 3.903 3.903 0 011.064.76c.068.072.142.067.211.043.115-.04.226-.093.33-.154.19-.111.34-.268.478-.438l.014.006a1.319 1.319 0 00-.011.037.595.595 0 01-.029.08l-.034.075c-.04.085-.079.17-.127.25-.1.165-.204.327-.319.481a7.506 7.506 0 01-.395.483 5.117 5.117 0 01-.326.328 7.705 7.705 0 01-.902.746c-.25.172-.507.334-.764.495-.054.035-.113.062-.172.089a3.056 3.056 0 00-.086.04c-.01.005-.018.013-.018.013zm1.905 2.515a2.98 2.98 0 011.472-.23 18.284 18.284 0 01-.014-.507c-.004-.38-.005-.762-.005-1.143l-.001-.494a.409.409 0 00-.005-.063 27.681 27.681 0 00-.086-.503l-.004-.018a.885.885 0 00-.024-.102l-.045-.13-.037-.107a2.127 2.127 0 01-.024-.078 1.24 1.24 0 00-.043-.13 7.896 7.896 0 00-.169-.37c-.02-.04-.042-.08-.065-.118l-.031-.053-.541.654-.12.144c.012.025.023.052.034.08.025.061.052.126.081.19.065.14.097.288.107.44a1.212 1.212 0 01-.275.851c-.185.22-.424.365-.698.446a1.363 1.363 0 01-.447.067c-.096-.004-.096 0-.084.09v.006l.01.129c.008.108.016.217.02.326a.091.091 0 00.053.085l.142.08c.101.056.202.112.302.17.166.095.332.19.497.288zM5.84 8.609l-.01.028-.012.03c-.034.088-.068.176-.1.265l-.06.17-.018.052-.016.048c-.019.055-.038.109-.055.164l-.037.125c-.01.035-.02.07-.032.105l-.035.112-.045.146-.031.11a4.023 4.023 0 01-.073.24c-.014.044-.03.088-.042.132-.013.044-.024.088-.035.133l-.031.118-.05.167-.035.112c-.01.031-.018.063-.027.094l-.036.122a.658.658 0 01-.037.093h-.017l-.116-.398-.068-.233-.053-.18-.027-.09-.074-.247a14.114 14.114 0 00-.036-.115l-.036-.115-.032-.108-.046-.15c-.01-.034-.022-.067-.034-.1v-.001a4.068 4.068 0 01-.061-.196 1.833 1.833 0 00-.041-.135c-.027-.073-.055-.146-.084-.218a12.408 12.408 0 01-.1-.263 3.793 3.793 0 00-.08-.213 6.031 6.031 0 00-.382-.749 1.757 1.757 0 00-.176-.253 2.362 2.362 0 00-.294-.293c-.065-.052-.14-.092-.214-.132l-.09-.049-.446-.254-.062-.035-.24-.136-.109-.062.135-.08.076-.046.143-.085.188-.105c.068-.038.137-.075.205-.114l.18-.105c.087-.051.173-.102.26-.15.083-.046.149-.094.122-.202v-.006l.035-.409c.003-.033.002-.06-.045-.058a1.56 1.56 0 01-.545-.086 1.502 1.502 0 01-.446-.236 1.294 1.294 0 01-.275-.291 1.05 1.05 0 01-.191-.493 1.346 1.346 0 01.019-.46c.033-.138.078-.27.146-.395.058-.107.057-.116-.025-.207l-.092-.101a6.186 6.186 0 01-.219-.246 4.585 4.585 0 01-.247-.33c-.02-.029-.04-.028-.056-.001a1.28 1.28 0 00-.06.118l-.017.036a9.05 9.05 0 00-.11.245 2.95 2.95 0 00-.178.499l-.007.021c-.025.09-.05.181-.068.273-.018.088-.028.178-.039.267v.008l-.016.123c-.015.11-.03.22-.03.33-.005.326-.005.651-.004.976v.534a8.565 8.565 0 01-.041 1.008l-.001.015-.019.13a36.369 36.369 0 00-.047.343l-.019.147-.001.01c-.01.06-.018.12-.03.18l-.102.442-.011.046a2.21 2.21 0 01-.039.148c-.02.068-.043.137-.064.205l-.04.127-.031.102a4.136 4.136 0 01-.21.567 7.12 7.12 0 01-.134.306c-.028.06-.059.12-.089.18l-.064.126c-.002.006 0 .014.002.023l.002.015.056-.043.105-.083c.088-.07.176-.142.263-.214h.002l.263-.214.204-.164c.14-.112.28-.224.418-.338.036-.03.047-.023.067.01.11.182.219.364.33.545.108.176.217.352.327.527l.022.036.197.313.08.126 1.03-.967L5.014 12l1.071-1.738A2.978 2.978 0 015.84 8.61zm-2.384-2.18l.136-.081c.09-.054.181-.109.272-.162.016-.01.032-.018.047-.026.025-.013.05-.025.072-.041a.19.19 0 00.085-.16l-.001-.095c-.001-.06-.002-.12 0-.18l.003-.056c.005-.126.01-.252.027-.376a1.57 1.57 0 01.08-.299c.033-.096.072-.191.12-.28.099-.183.243-.331.423-.43a.574.574 0 01.552-.017c.206.1.353.26.468.453.074.123.119.256.154.396.068.264.069.53.064.798-.003.17.044.228.18.304l.124.07.206.116.032.02c.016.01.032.02.049.028.043.02.033.04 0 .06a2.395 2.395 0 00-.635.547c-.13.161-.242.333-.34.514a4.05 4.05 0 00-.173.384l-.015.037a9.5 9.5 0 00-.168.444c-.023.064-.041.128-.06.193a5.611 5.611 0 01-.103.323l-.036.11a7.995 7.995 0 00-.025-.067c-.017-.043-.031-.08-.044-.119a22.49 22.49 0 01-.095-.292l-.017-.054-.031-.1c-.022-.07-.043-.14-.069-.209a5.83 5.83 0 00-.12-.29l-.018-.04-.03-.072c-.041-.094-.082-.188-.128-.279-.052-.1-.111-.197-.175-.29a2.55 2.55 0 00-.372-.433 2.16 2.16 0 00-.414-.307c-.01-.006-.023-.01-.034-.013a.415.415 0 01-.015-.005l.012-.012.012-.012zm.455-2.112c-.044.024-.084.046-.128.058-.16.046-.324.084-.492.059-.25-.039-.48-.118-.623-.35a.497.497 0 01-.058-.422l.063-.207c.413.324.84.59 1.306.826l-.062.033-.006.003zm2.144-.036a7.913 7.913 0 001.296-.819c.085.167.122.336.068.512a.577.577 0 01-.252.311.964.964 0 01-.652.147c-.09-.011-.178-.04-.265-.069a4.07 4.07 0 00-.093-.03c-.02-.005-.04-.017-.063-.03a1.038 1.038 0 00-.039-.022z"></path><path d="M8.196 6.998a2.371 2.371 0 012.905.938 2.368 2.368 0 01.326.886c.011.071.02.14.025.209h.211c.08 0 .15.03.204.077.05.044.085.098.107.155.025.067.03.135.023.2a.487.487 0 01-.083.215c-.058.087-.13.198-.217.333-.093.144-.207.3-.344.466a.552.552 0 01-.176.15.4.4 0 01-.234.037.356.356 0 01-.245-.14.956.956 0 00-.088-.098 2.451 2.451 0 01-.205-.234 5.724 5.724 0 01-.377-.55.48.48 0 01-.08-.207.402.402 0 01.022-.193.34.34 0 01.108-.148.297.297 0 01.182-.063h.237a1.525 1.525 0 00-.431-.859 1.228 1.228 0 00-.447-.288 1.435 1.435 0 00-1.05.014 1.312 1.312 0 00-.447.297 1.425 1.425 0 00-.309.462c-.075.18-.116.363-.124.551-.008.187.019.368.08.543.058.169.152.313.281.435.125.114.247.202.365.265.124.065.241.111.353.14.115.028.22.04.318.038.107-.003.201-.015.284-.035a.95.95 0 00.218-.078.628.628 0 00.137-.09l.017-.016.019-.011a.677.677 0 01.319-.093c.14-.006.264.05.359.148.106.107.173.253.13.419a.698.698 0 01-.342.422 1.81 1.81 0 01-.694.296c-.251.05-.504.053-.758.01a2.581 2.581 0 01-1.37-.715 2.317 2.317 0 01-.522-.787 2.388 2.388 0 011.313-3.101z"></path></g><defs><clipPath id="clip0_8943_578"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                </a>
                            </div>
                        </div>

                        {/* buy button */}
                        <button className="sticky right-0 flex items-center gap-1 hover:bg-[rgb(238,239,242)] hover:text-[rgb(41,44,51)] dark:hover:bg-[rgb(82,86,93)] dark:hover:text-[rgb(245,245,245)] p-1 rounded-lg">
                            {
                                getChain() == "sol" ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#88D693" viewBox="0 0 16 16"><g clipPath="url(#clip0_9339_171)"><path d="M3.229 9.046L9.756 0 8.452 6.637h3.757a.2.2 0 01.162.317L5.844 16 7.03 9.363H3.39a.2.2 0 01-.161-.317z"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.5 8a6.5 6.5 0 017.933-6.341L9.63.678A7.5 7.5 0 004.9 14.832l.187-1.02A6.5 6.5 0 011.5 8zm4.663 6.237l-.174.99a7.5 7.5 0 004.781-14.2l-.231.987a6.502 6.502 0 01-4.376 12.223z"></path><path fillRule="evenodd" clipRule="evenodd" d="M6.711 1.63c.508-.133 1.013.827.681 1.602-.335.78.978-.978 1.497-1.866L7.023.813l-.312.818zm1.575 10.985c-.345.54-.673 1.897.343 1.85 1.052-.049-.925.19-2.074.124 0 0 2.075-2.513 1.73-1.974z"></path></g><defs><clipPath id="clip0_9339_171"><rect width="16" height="16"></rect></clipPath></defs></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="md:w-[12px] w-[20px]" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#595000"></circle><path d="M8.327 12.602l3.39-5.086a.435.435 0 00-.36-.676H8.69V3.638a.435.435 0 00-.797-.241l-3.39 5.086a.435.435 0 00.362.676H7.53v3.202a.435.435 0 00.796.241z" fill="#FFEC42"></path></svg>
                            }
                            <div className="text-[12px]">Buy</div>
                        </button>
                    </div>

                    {/* second line */}
                    <div className="flex gap-2 text-[12px] whitespace-nowrap">
                        {/* for hours  #AEB2DB */}
                        <TooltipProvider delayDuration={500}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className={`text-accent-green`}>1h</div>
                                </TooltipTrigger>
                                <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                    <p>{memeData?.timestamp}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <div className="flex items-center gap-1`">
                            <p className='text-[#AEB2DB]'>{truncAddress(memeData?.contractAddress)}</p>
                            <button onClick={() => copyToClipboard(memeData?.contractAddress)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12"><g clipPath="url(#clip0_6972_490)"><path d="M.5 5.214a2.357 2.357 0 012.357-2.357h3.929a2.357 2.357 0 012.357 2.357v3.929A2.357 2.357 0 016.786 11.5H2.857A2.357 2.357 0 01.5 9.143V5.214z"></path><path d="M2.987 2.084c.087-.008.174-.013.263-.013h3.929a2.75 2.75 0 012.75 2.75V8.75c0 .089-.005.177-.013.263A2.358 2.358 0 0011.5 6.786V2.857A2.357 2.357 0 009.143.5H5.214c-1.03 0-1.907.662-2.227 1.584z"></path></g><defs><clipPath id="clip0_6972_490"><rect width="12" height="12"></rect></clipPath></defs></svg>
                            </button>
                        </div>
                        {/* hotpot datas */}
                        <TooltipProvider delayDuration={500}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="flex gap-1 items-center">
                                        {/* question mark */}
                                        {memeData?.hotpot?.status && <p className='text-[#AEB2DB]'>{memeData.hotpot.status}</p>}
                                        {memeData?.hotpot?.verified && <p className={`${memeData.hotpot.verified ? 'text-accent-green' : 'text-accent-red'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 16 16"><path d="M14.78 3.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 011.06-1.06l3.97 3.97 7.47-7.47a.75.75 0 011.06 0z"></path></svg>
                                        </p>}
                                        {memeData?.hotpot?.renounced && <p className={`${memeData.hotpot.renounced ? 'text-accent-green' : 'text-accent-red'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M12.47 2.47a.75.75 0 111.06 1.06L9.06 8l4.47 4.47a.75.75 0 11-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 01-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 011.06-1.06L8 6.94l4.47-4.47z"></path></svg>
                                        </p>}
                                        {memeData?.hotpot?.locked && <p className={`${memeData.hotpot.locked ? 'text-accent-green' : 'text-accent-red'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M12.47 2.47a.75.75 0 111.06 1.06L9.06 8l4.47 4.47a.75.75 0 11-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 01-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 011.06-1.06L8 6.94l4.47-4.47z"></path></svg>
                                        </p>}
                                        {
                                            memeData?.hotpot?.top10Percentage && <p className={`${memeData.hotpot.top10Percentage <= 30 ? 'text-accent-green' : 'text-accent-red'} flex items-center gap-1`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path d="M3 14.579a4.117 4.117 0 014.117-4.118c.095 0 .184.048.237.127l2.288 3.432a.57.57 0 00.947 0l2.288-3.432a.284.284 0 01.236-.127 4.117 4.117 0 014.118 4.118v4.048a.373.373 0 01-.374.373H3.373A.373.373 0 013 18.627v-4.048z"></path><circle cx="10.116" cy="4.769" r="4.269"></circle></svg>
                                                <span className='text-[13px]'>{memeData.hotpot.top10Percentage}%</span>
                                            </p>
                                        }
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                    <div className="">Honey Pot <span className='text-[#AEB2DB]'>{memeData.hotpot.status}</span></div>
                                    <div className="">Verified  <span className={`${memeData?.hotpot?.verified ? 'text-accent-green' : 'text-accent-red'}`}>{memeData?.hotpot?.verified ? "No" : "yes"}</span></div>
                                    <div className="">Renounced  <span className={`${memeData?.hotpot?.renounced ? 'text-accent-green' : 'text-accent-red'}`}>{memeData?.hotpot?.renounced ? "No" : "yes"}</span></div>
                                    <div className="">Locked  <span className={`${memeData?.hotpot?.locked ? 'text-accent-green' : 'text-accent-red'}`}>{memeData?.hotpot?.verified ? "No" : "yes"}</span></div>
                                    <div className="">Top 10 <span className={`${memeData?.hotpot?.top10Percentage ? 'text-accent-green' : 'text-accent-red'}`}>{memeData?.hotpot?.top10Percentage ? "No" : "yes"}</span></div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {/* user */}
                        {memeData?.holdings?.dev && <TooltipProvider delayDuration={500}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className={`${memeData?.holdings?.dev < 5 ? 'text-accent-green' : 'text-accent-red'} flex items-center gap-1`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path d="M15 6A5 5 0 115 6a5 5 0 0110 0z"></path><path d="M10 8.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path><path d="M19 8.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"></path><path d="M5 8a1 1 0 00-1 1v9a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1H5zm1.7 8h6.6a.7.7 0 110 1.4H6.7a.7.7 0 110-1.4z"></path></svg>
                                        <span>{memeData?.holdings?.dev < 5 ? `${memeData?.holdings?.dev}%` : "Run"}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                    <p>{memeData?.holdings?.dev < 5 ? `Dev holds ${memeData?.holdings?.dev}%` : "Dev Sell All"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>}

                        {/* insider */}
                        {memeData?.holdings?.insider && <TooltipProvider delayDuration={500}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className={`${memeData?.holdings.insider < 5 ? 'text-accent-green' : 'text-accent-red'} flex items-center gap-1`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" clipRule="evenodd" d="M15.5 8a3.5 3.5 0 10-3.463-2.988 2.953 2.953 0 00-.1-.012C7.844 5 6.274 7.972 6 9.457c.379.46 1.49 1.495 2.905 1.947-1.099 1.254-1.56 4.194-1.71 6.275-1.042-.093-2.369-.287-3.614-.653-.677-.2-1.047-.599-1.247-1.116-.211-.546-.242-1.248-.15-2.021.117-1.003.432-1.897.696-2.648.056-.158.11-.31.158-.456.08-.236.149-.44.198-.604.233-.779-.11-1.498-.532-1.914-.408-.404-1.243-.744-1.638-.744v.986c.268.086.65.274.914.537.253.25.356.51.262.823-.038.126-.096.298-.166.506-.073.215-.176.476-.291.768-.326.828-.752 1.905-.867 2.893-.1.843-.148 1.732.148 2.497.307.793 1.1 1.44 2.17 1.884 1.711.595 3.153.595 4.09.595h.011L7.349 19h9.64c.045-.268.026-6.977-1.804-11.014.104.01.209.014.315.014zM11 8a1 1 0 11-2 0 1 1 0 012 0z"></path><path d="M11 4c0 .039 0 .078-.002.116-2.138.334-3.601 1.338-4.553 2.45A3 3 0 1111 4z"></path></svg>
                                        <span>{memeData?.holdings?.insider}%</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                    <p>Insiders&apos; holding quantity is {memeData?.holdings.insider}% of the total</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>}

                        {/* tax b/s */}
                        <div className="gap-1">
                            Tax B/S:
                            <span className='text-[#AEB2DB] mx-1'>{memeData?.tax?.buy}% /</span>
                            <span className='text-[#AEB2DB]'>{memeData?.tax?.sell}%</span>
                        </div>

                    </div>

                    <div className="flex justify-between items-center">
                        {/* socials */}
                        <div className="flex gap-1">
                            {/* x - twitter */}
                            {
                                !!memeData?.socials?.twitter && (
                                    <a href={memeData?.socials?.twitter} target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12"><g clipPath="url(#clip0_7920_513)"><path d="M9.282 1h1.71L7.255 5.27l4.394 5.809H8.21L5.515 7.555 2.43 11.08H.721l3.995-4.567L.5 1h3.528l2.436 3.22L9.282 1zm-.6 9.056h.947L3.513 1.97H2.497l6.185 8.086z"></path></g><defs><clipPath id="clip0_7920_513"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                    </a>
                                )
                            }
                            {/* web - their site */}
                            {
                                !!memeData?.socials?.website && (
                                    <a href={memeData?.socials?.website} target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 20 20"><g clipPath="url(#clip0_1553_2200)"><path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM6.446 2.831A8.037 8.037 0 003.07 6h2.323c.212-1.023.505-1.96.865-2.77.06-.136.123-.269.188-.399zM2 10c0-.69.088-1.36.252-2h2.842a21.008 21.008 0 000 4H2.252A8.013 8.013 0 012 10zm1.07 4a8.037 8.037 0 003.376 3.169 9.877 9.877 0 01-.188-.399c-.36-.81-.653-1.747-.865-2.77H3.07zm4.372 0c.173.732.392 1.392.643 1.958.328.738.693 1.273 1.047 1.61.35.333.641.432.868.432.227 0 .518-.1.867-.432.355-.337.72-.872 1.048-1.61.251-.566.47-1.226.643-1.958H7.442zm7.165 0a13.716 13.716 0 01-.865 2.77c-.06.136-.123.269-.188.399A8.037 8.037 0 0016.93 14h-2.323zm3.14-2h-2.841a21.027 21.027 0 000-4h2.842c.165.64.252 1.31.252 2s-.087 1.36-.252 2zm-4.851 0H7.104A18.907 18.907 0 017 10c0-.693.037-1.362.104-2h5.792c.067.638.104 1.307.104 2 0 .693-.037 1.362-.104 2zm1.71-6h2.324a8.037 8.037 0 00-3.376-3.169c.065.13.128.263.188.399.36.81.653 1.747.865 2.77zm-6.52-1.958c-.252.566-.47 1.226-.644 1.958h5.116a11.248 11.248 0 00-.643-1.958c-.328-.738-.693-1.273-1.047-1.61C10.518 2.099 10.226 2 10 2c-.227 0-.518.1-.868.432-.354.337-.719.872-1.047 1.61z"></path></g><defs><clipPath id="clip0_1553_2200"><rect width="20" height="20"></rect></clipPath></defs></svg>
                                    </a>
                                )
                            }
                            {/* telegram */}
                            {
                                !!memeData?.socials?.twitter && (
                                    <a href={memeData?.socials?.twitter} target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#AEB2BD" viewBox="0 0 12 12"><g clipPath="url(#clip0_7920_515)"><path d="M11.894 1.91l-1.8 8.487c-.134.6-.49.746-.992.465L6.36 8.842l-1.322 1.273c-.147.147-.27.27-.551.27l.196-2.793L9.764 3c.22-.196-.05-.307-.344-.11L3.138 6.844.43 6c-.588-.183-.6-.588.122-.869l10.582-4.078c.49-.183.918.11.76.857z"></path></g><defs><clipPath id="clip0_7920_515"><rect width="12" height="12"></rect></clipPath></defs></svg>
                                    </a>
                                )
                            }

                        </div>

                        {/* liq */}
                        <div className="flex items-center gap-1 text-[12px]">
                            {/* Liquidity */}
                            {memeData?.metrics?.liquidity && <TooltipProvider delayDuration={500}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex gap-1 items-center text-accent-aux-1 font-[300]">
                                            <div className="">Liq</div>
                                            <div className="font-[400] text-accent-1">${formatNumber(memeData.metrics.liquidity)}</div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                        <p>Liq</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}

                            {/* holder */}
                            {memeData?.metrics?.holders && <TooltipProvider delayDuration={500}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center gap-1 text-accent-aux-1 font-[300]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#AEB2BD" viewBox="0 0 12 12"><path d="M4 5a2 2 0 100-4 2 2 0 000 4z"></path><path d="M4 6c-1.657 0-3 .5-3 3a2 2 0 002 2h2a2 2 0 002-2c0-2.5-1.343-3-3-3z"></path><path d="M7.195 10.831c.22.097.418.169.605.169h1.6A1.6 1.6 0 0011 9.4C11 7.5 9.925 7 8.6 7c-.54 0-.947.149-1.194.36.402.535.506 1.144.506 1.864 0 .577-.32 1.272-.717 1.607z"></path><path d="M7 4.6a1.6 1.6 0 103.2 0 1.6 1.6 0 00-3.2 0z"></path></svg>
                                            <div className="font-[400] text-accent-1">{memeData?.metrics?.holders}</div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                        <p>Total Holders</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}

                            {/* volume */}
                            {memeData?.metrics?.volume && <TooltipProvider delayDuration={500}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center gap-1 text-accent-aux-1 font-[300]">
                                            V <div className="font-[400] text-accent-1">${formatNumber(memeData.metrics.volume)}</div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[400]'>
                                        <p>1m Volume</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}

                            {/* MRK CAP -  */}
                            {memeData?.metrics?.volume && <TooltipProvider delayDuration={500}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className="flex items-center gap-1 text-accent-aux-1 font-[300]">
                                            MC <div className="font-[400] text-accent-1">${formatNumber(memeData.metrics.volume)}</div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side={'bottom'} className='bg-[#f7f5f5] dark:bg-[#000] text-[#111111] text-[12px] font-[3=400]'>
                                        <p>MKT Cap</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>}



                        </div>
                    </div>


                </div>
            </a>
        </>
    )
}
