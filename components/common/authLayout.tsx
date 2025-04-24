'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

export default function AuthLayout({ setAuthModal, showAuth = true }: { setAuthModal?, showAuth?: boolean }) {
    const [isModal, setAuthModalOpt] = useState(showAuth)
    setAuthModal = typeof setAuthModal == "undefined" ? setAuthModalOpt : setAuthModal
    return (
        <div className={`font-system  ${isModal ? "flex" : "hidden"} fixed text-[rgb(41,44,51)] dark:text-[#f4f4f5] bg-[#f4f4f5]/95 dark:bg-[#111111]/95  w-screen z-[1500] inset-0 h-screen  items-center justify-center`}>
            <div className="min-h-[250px] w-[650px] flex flex-col justify-center items-center px-3">
                <div>
                    <div className="text-center font-[600]  flex items-center gap-2 md:text-[2rem] sm:text-[1.6rem] text-[1.2rem]">
                        <div className="">Instant</div>
                        <div className="">Autonomous Trading</div>
                        <Image src='/rocket.svg' width="10" height="10" alt="rocket" className='w-10 h-10' />
                    </div>
                    {/* <div className="text-center font-[600] leading-relaxed" style={{ fontSize: 'min(40px, 7vw)' }}>
                        Fast AFK Automation 🚀
                    </div> */}
                </div>

                <div className="text-[#6E727D] dark:text-[#9AA0AA]  mt-[16px] text-center w-full" style={{ fontSize: 'min(16px, 5vw)' }}>
                    {/* Discover faster, Trading in seconds 🚀 On-chain at the speed of light. Click to trade. */}
                    <div className="">Connect your Telegram to Trade Anywhere, Anytime.</div>
                </div>

                <div className="flex flex-col justify-center items-center mt-[36px]">
                    <button className='button-brand max-w-[284px] w-full min-w-[2.5rem] inline-flex gap-[8px] rounded-[8px] justify-center items-center font-[600] px-[52px] h-[48px] whitespace-nowrap select-none'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 12 12"><g clipPath="url(#clip0_7920_515)"><path d="M11.894 1.91l-1.8 8.487c-.134.6-.49.746-.992.465L6.36 8.842l-1.322 1.273c-.147.147-.27.27-.551.27l.196-2.793L9.764 3c.22-.196-.05-.307-.344-.11L3.138 6.844.43 6c-.588-.183-.6-.588.122-.869l10.582-4.078c.49-.183.918.11.76.857z"></path></g><defs><clipPath id="clip0_7920_515"><rect width="12" height="12"></rect></clipPath></defs></svg>
                        Connect Telegram
                    </button>

                    <div className="flex justify-center text-[#6E727D] dark:text-[#9AA0AA] text-[14px] font-[500] leading-[21px] mt-[16px] w-full items-center gap-[4px]">
                        Or Sign In With Wallet
                        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 12 12"><path d="M6.721 1.643a.5.5 0 00-.006.707L9.808 5.5H1a.5.5 0 000 1h8.808L6.715 9.65a.5.5 0 00.713.7l3.929-4a.5.5 0 000-.7l-3.929-4a.5.5 0 00-.707-.007z"></path></svg>
                    </div>
                </div>

                <div className="flex text-[#AEB2BD] dark:text-[#5C6068] gap-[4px] justify-center items-center absolute bottom-[20%] text-[12px]">
                    <Link href="/privacy-policy">Term of Service </Link> |
                    <Link href="/privacy-policy">Privacy Policy</Link>
                </div>
            </div>

            <button className="absolute right-[24px] top-[24px] cursor-pointer" onClick={() => setAuthModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 40 40"><path fillRule="evenodd" clipRule="evenodd" d="M20 38.919c10.449 0 18.919-8.47 18.919-18.919S30.449 1.081 20 1.081 1.081 9.551 1.081 20 9.551 38.919 20 38.919zM20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"></path><path fillRule="evenodd" clipRule="evenodd" d="M20 38.919c10.449 0 18.919-8.47 18.919-18.919S30.449 1.081 20 1.081 1.081 9.551 1.081 20 9.551 38.919 20 38.919zM20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"></path><path d="M21.146 19.973l6.723-6.694a.811.811 0 10-1.144-1.15l-6.724 6.694-6.666-6.692a.811.811 0 10-1.149 1.147l6.665 6.69-6.72 6.689a.811.811 0 001.144 1.15l6.721-6.69 6.727 6.752a.806.806 0 001.146.002.812.812 0 00.002-1.147l-6.725-6.751z"></path><path d="M21.146 19.973l6.723-6.694a.811.811 0 10-1.144-1.15l-6.724 6.694-6.666-6.692a.811.811 0 10-1.149 1.147l6.665 6.69-6.72 6.689a.811.811 0 001.144 1.15l6.721-6.69 6.727 6.752a.806.806 0 001.146.002.812.812 0 00.002-1.147l-6.725-6.751z"></path></svg>
            </button>
        </div>
    )
}
