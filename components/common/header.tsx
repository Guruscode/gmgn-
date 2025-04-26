"use client";
import { localStore, themeMode, updateUrlParams } from '@/lib/utils'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SearchModal from '@/components/SearchModal';
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit"; 

export default function Header() {
    const pathname = usePathname()
    const params = useSearchParams()
    const router = useRouter()
    const [switchMode, setSwitchMode] = useState(false)
    const [isSearchModalOpen, setSearchModalOpen] = useState(false)
    // const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    // const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const handleDisconnect = () => {
        disconnect();
    };

    const navLinks = [
        {
            link: "/meme",
            linkText: "Meme"
        },
        {
            link: "/new-pair",
            linkText: "New pair"
        },
        {
            link: "/",
            linkText: "Trending"
        },
        {
            link: "/holding",
            linkText: "Holding"
        },
    ]

    const selectNetwork = [
        {
            img: "/static/solana.webp",
            ntwk: "sol"
        },
        {
            img: "/static/ether.webp",
            ntwk: "eth"
        },
        {
            img: "/static/base.webp",
            ntwk: "base"
        },
        {
            img: "/static/bsc.png",
            ntwk: "bsc"
        },
        {
            img: "/static/tron.webp",
            ntwk: "tron"
        },
        {
            img: "/static/blast.webp",
            ntwk: "blast"
        }
    ]

    const language = [
        {
            lang: "English"
        },
        {
            lang: "简体中文"
        },
        {
            lang: "繁體中文"
        },
        {
            lang: "한국어"
        },
    ]

    useEffect(() => {
        themeMode().default()
        setSwitchMode(themeMode().getFromStore() == "dark")
        updateUrlParams({ chain: localStore("network") || "sol" })
        if (pathname == "/meme" && params.get("chain") != "sol") {
            router.push("/")
        }
    }, [pathname, params, router])

    const getChain = useCallback(() => {
        return params.get("chain")
    }, [params])

    return (
        <div className="">
            <div className='md:px-[1.3rem] px-[.5rem] h-[56px] flex items-center gap-5 justify-between w-full'>
                <div className="flex items-center gap-5">
                    <div className="">
                        <Image src="/logo_light.svg" width={120} height={120} alt='logo light' className=' dark:hidden md:block hidden md:min-w-[170px] min-w-[100px]' />
                        <Image src="/logo_black.png" width={120} height={120} alt='logo dark' className=' md:dark:block md:block hidden md:min-w-[170px] min-w-[100px]' />
                        <Image src="/logo_black.png" width={120} height={120} alt='logo dark' className='md:hidden  min-w-[100px] translate-x-[-10px]' />
                    </div>
                    <ul className="md:flex gap-3 hidden overflow-hidden">
                        {navLinks.map((item, index) => {
                            if (item.link === '/meme' && getChain() !== 'sol') {
                                return null;
                            }

                            const isActive = pathname === item.link;
                            const linkClassName = `h-full w-full ${isActive ? 'dark:text-white text-black' : 'text-accent-1'}`;

                            return (
                                <li key={index} className="font-medium text-sm whitespace-nowrap">
                                    <Link
                                        href={item.link === '/meme' ? `${item.link}?chain=sol&tab=home` : item.link}
                                        className={linkClassName}
                                    >
                                        {item.linkText}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="relative max-w-[440px] w-full md:flex mx-[24px] hidden">
                    <div className="w-full relative h-[40px] rounded-lg overflow-hidden hover:border-inherit border border-transparent">
                        <div className="absolute z-[2] top-0 h-[40px] left-[4px] flex items-center justify-center text-accent-4 text-aux-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="currentColor" viewBox="0 0 20 20"><path d="M9.213 1.988a7.14 7.14 0 017.135 7.234c-.035 3.922-3.28 7.111-7.203 7.082-3.985-.03-7.181-3.276-7.14-7.25.042-3.933 3.253-7.081 7.208-7.066zm-.058 12.61a5.473 5.473 0 005.508-5.412c.04-3.025-2.465-5.536-5.51-5.524-3.007.012-5.45 2.467-5.45 5.476a5.455 5.455 0 005.452 5.46z"></path><path d="M16.666 17.795l-1.24-1.24a.75.75 0 010-1.056l.055-.055a.749.749 0 011.056 0l1.24 1.24a.75.75 0 010 1.057l-.054.054a.75.75 0 01-1.057 0z"></path></svg>
                        </div>
                        <input 
                          type="text" 
                          onClick={() => setSearchModalOpen(true)} 
                          className='w-full h-full pl-8 placeholder:opacity-50 outline-none text-xs bg-accent-2' 
                          placeholder='Search token/contract/wallet' 
                        />
                        <div className="h-[40px] flex justify-center items-center absolute right-0 top-0 z-[2]">
                            <div className="flex h-[1.25rem] bg-accent-3 rounded-[4px] justify-center items-center px-1 text-aux-1 text-[12px] whitespace-nowrap">Ctrl alt K</div>
                        </div>
                    </div>

                    <SearchModal
                      isOpen={isSearchModalOpen}
                      onClose={() => setSearchModalOpen(false)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex gap-2 md:pr-[100px] items-center">
                        <Select defaultValue={localStore("network") || "sol"} onValueChange={(v) => {
                            updateUrlParams({ chain: v.toLowerCase() })
                            window.localStorage.setItem("network", v);
                        }}>
                            <SelectTrigger className="md:w-[130px] w-[80px] p-0 md:bg-accent-2 rounded-xl border-none outline-none focus:ring-0">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    selectNetwork.map(({ img, ntwk }, i) => (
                                        <SelectItem value={ntwk} key={i}>
                                            <div className="flex items-center gap-1 uppercase">
                                                <Image src={img} alt={ntwk} className='w-[18px] h-[18px]' width={10} height={10} />
                                                {ntwk}
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>

                        <Dialog>
                            <DialogTrigger>
                                <div className='md:hidden' onClick={() => setSearchModalOpen(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.8a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zM1.2 7.5a6.3 6.3 0 1112.6 0 6.3 6.3 0 01-12.6 0z"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.934 10.934a.8.8 0 011.132 0l3 3a.8.8 0 11-1.132 1.132l-3-3a.8.8 0 010-1.132z"></path></svg>
                                </div>
                            </DialogTrigger>
                            <DialogContent className='h-full bg-[#f4f4f5] w-full p-2 overflow-y-scroll'>
                                <SearchModal
                                  isOpen={isSearchModalOpen}
                                  onClose={() => setSearchModalOpen(false)}
                                />
                            </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className='hover:bg-accent-2 duration-150 h-[35px] w-[35px] flex justify-center items-center rounded-md text-accent-search'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" className='text-accent-4' viewBox="0 0 20 20">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.652 2.05a2.75 2.75 0 012.696 0l4.977 2.8a2.75 2.75 0 011.402 2.397v5.51a2.75 2.75 0 01-1.402 2.397l-4.977 2.8a2.75 2.75 0 01-2.696 0l-4.978-2.8a2.75 2.75 0 01-1.402-2.397v-5.51c0-.994.536-1.91 1.402-2.397l4.978-2.8zm1.96 1.308a1.25 1.25 0 00-1.225 0l-4.977 2.8a1.25 1.25 0 00-.638 1.089v5.51c0 .451.244.868.638 1.09l4.977 2.799c.38.214.845.214 1.226 0l4.977-2.8a1.25 1.25 0 00.637-1.09v-5.51a1.25 1.25 0 00-.637-1.089l-4.977-2.8z"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 8.133a1.866 1.866 0 100 3.733 1.866 1.866 0 000-3.733zM6.634 9.999a3.366 3.366 0 116.733 0 3.366 3.366 0 01-6.733 0z"></path>
                                    </svg>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-[250px] space-y-1'>
                                <DropdownMenuItem>
                                    <div className="flex justify-between w-full items-center">
                                        <div className="text-xs">Alert Settings</div>
                                        <div className="rotate-[-90deg] text-accent-search">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" className='' viewBox="0 0 16 16"><path fillRule="evenodd" clipRule="evenodd" d="M2.273 5.675a.933.933 0 011.32 0l4.674 4.674 4.673-4.674a.933.933 0 011.32 1.32L8.267 12.99 2.273 6.995a.933.933 0 010-1.32z"></path></svg>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="text-xs">Language</div>
                                        <div className="">
                                            <Select>
                                                <SelectTrigger className="w-[70px] text-xs bg-[#dbdee6] dark:bg-[#393c43] p-1 py-0 h-[25px] rounded-md border-none">
                                                    <SelectValue placeholder="English" />
                                                </SelectTrigger>
                                                <SelectContent className='bg-accent-3'>
                                                    {
                                                        language.map(({ lang }, i) => (
                                                            <SelectItem value={lang} key={i}>
                                                                <div className="flex items-center gap-1">
                                                                    {lang}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </DropdownMenuItem>

                                <div className='px-2 mt-2'>
                                    <div className="flex w-full justify-between">
                                        <div className="text-xs">Dark Mode</div>
                                        <div className="">
                                            <Switch
                                                defaultChecked={switchMode}
                                                onCheckedChange={() => {
                                                    const s = themeMode().switch()
                                                    setSwitchMode(s)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                      
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus || authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button
                                                    onClick={openConnectModal}
                                                    className="bg-white text-black font-medium py-2 px-4 rounded-lg hover:opacity-90 transition"
                                                >
                                                    Connect
                                                </button>
                                            );
                                        }

                                        if (chain.unsupported) {
                                            return (
                                                <button
                                                    onClick={openChainModal}
                                                    className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition"
                                                >
                                                    Wrong network
                                                </button>
                                            );
                                        }

                                        return (
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                                        className="w-10 h-10 rounded bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold flex items-center justify-center hover:opacity-90 transition relative"
                                                    >
                                                        {account.displayName.slice(2, 4).toUpperCase()}
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                                                    </button>

                                                    {dropdownOpen && (
                                                        <div className="absolute right-0 mt-2 w-96 bg-gray-900 shadow-2xl rounded-lg py-2 z-50 border border-gray-800 overflow-hidden">
                                                            <div className="py-1">
                                                                <button className="w-full text-left px-4 py-3 text-lg text-gray-200 hover:text-white transition-all flex items-center gap-3 relative group overflow-hidden">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                    <div className="bg-blue-500 rounded-full p-1 w-8 h-8 flex items-center justify-center relative z-10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="relative z-10">Switch TG login</span>
                                                                </button>
                                                                
                                                                <button className="w-full text-left px-4 py-3 text-lg text-gray-200 hover:text-white transition-all flex items-center gap-3 relative group overflow-hidden">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                    <div className="w-8 h-8 relative z-10"></div>
                                                                    <span className="font-mono">{account.displayName}</span>
                                                                </button>
                                                                
                                                                <div className="border-t border-gray-700 my-1"></div>
                                                                
                                                                <button className="w-full text-left px-4 py-3 text-lg text-gray-200 hover:text-white transition-all flex items-center gap-3 relative group overflow-hidden">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                    <div className="w-8 h-8 flex items-center justify-center relative z-10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                                                            <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="relative z-10">My Wallet</span>
                                                                </button>
                                                                
                                                                <button className="w-full text-left px-4 py-3 text-lg text-gray-200 hover:text-white transition-all flex items-center gap-3 relative group overflow-hidden">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                    <div className="w-8 h-8 flex items-center justify-center relative z-10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="relative z-10">Referral</span>
                                                                </button>
                                                                
                                                                <div className="border-t border-gray-700 my-1 "></div>
                                                                
                                                                <button className="w-full text-left px-4 py-3 text-lg text-white transition-all flex items-center gap-3 relative  mx-2 rounded-lg">
                                                                    <div className="w-8 h-8 flex items-center justify-center relative z-10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="relative z-10">Contest(S6)</span>
                                                                </button>
                                                                
                                                                <div className="border-t border-gray-700 my-1"></div>
                                                                
                                                                <button className="w-full text-left px-4 py-3 text-lg text-gray-200 hover:text-white transition-all flex items-center gap-3 relative group overflow-hidden">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                    <div className="w-8 h-8 flex items-center justify-center relative z-10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="relative z-10">TG Alert Tutorial</span>
                                                                </button>
                                                                
                                                                <div className="border-t border-gray-700 my-1"></div>
                                                                
                                                                <button
                                                                    onClick={() => {
                                                                        handleDisconnect();
                                                                        setDropdownOpen(false);
                                                                    }}
                                                                    className="w-full text-left px-4 py-3 text-lg text-gray-200 hover:text-white transition-all flex items-center gap-3 relative group overflow-hidden"
                                                                >
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                    <div className="w-8 h-8 flex items-center justify-center relative z-10">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4a1 1 0 102 0V8zm-2 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="relative z-10">Disconnect</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>
            </div>
            <div className="bg-accent-3 border-t w-full overflow-x-auto">
                <ul className="md:hidden gap-3 flex py-2 px-5">
                    {navLinks.map((item, index) => {
                        if (item.link === '/meme' && getChain() !== 'sol') {
                            return null;
                        }

                        const isActive = pathname === item.link;
                        const linkClassName = `h-full w-full ${isActive ? 'dark:text-white text-black' : 'text-accent-1'}`;

                        return (
                            <li
                                key={index}
                                className="font-medium text-sm whitespace-nowrap"
                            >
                                <Link
                                    href={item.link === '/meme' ? `${item.link}?chain=sol&tab=new-creation` : item.link}
                                    className={linkClassName}
                                >
                                    {item.linkText}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}