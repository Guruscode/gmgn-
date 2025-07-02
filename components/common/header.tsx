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
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Connection } from '@solana/web3.js';

export default function Header() {
    const pathname = usePathname()
    const params = useSearchParams()
    const router = useRouter()
    const [switchMode, setSwitchMode] = useState(false)
    const [isSearchModalOpen, setSearchModalOpen] = useState(false)
    const { publicKey, disconnect, connected } = useWallet();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const avatarUrl = '/logo_light.svg'; // You can replace this with a dynamic avatar if available
    const [isClient, setIsClient] = useState(false);
    const { setVisible, visible } = useWalletModal();
    const [solBalance, setSolBalance] = useState<string>('0');

    const navLinks = [
        {
            link: "/meme",
            linkText: "Meme"
        },
        // {
        //     link: "/new-pair",
        //     linkText: "New pair"
        // },
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

    useEffect(() => { setIsClient(true); }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            if (publicKey) {
                try {
                    const connection = new Connection('https://api.mainnet-beta.solana.com');
                    const balance = await connection.getBalance(publicKey);
                    setSolBalance((balance / 1e9).toFixed(2));
                } catch {
                    setSolBalance('0');
                }
            }
        };
        if (connected && publicKey) {
            fetchBalance();
        }
    }, [connected, publicKey]);

    useEffect(() => {
        if (!visible) return;
        function handleClick(e: MouseEvent) {
            const modal = document.querySelector('.wallet-adapter-modal-wrapper');
            if (modal && !modal.contains(e.target as Node)) {
                setVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [visible, setVisible]);

    const getChain = useCallback(() => {
        return params.get("chain")
    }, [params])

    return (
        <div className="">
            <div className='md:px-[1.3rem] px-[.5rem] h-[56px] flex items-center gap-5 justify-between w-full'>
                <div className="flex items-center gap-5">
                    <div className="">
                        <Image src="/logo_light.svg" width={150} height={150} alt='logo light' className=' dark:hidden md:block hidden md:min-w-[200px] min-w-[130px]' />
                        <Image src="/logo_black.svg" width={150} height={150} alt='logo dark' className=' md:dark:block md:block hidden md:min-w-[200px] min-w-[130px]' />
                        <Image src="/logo_black.svg" width={150} height={150} alt='logo dark' className='md:hidden  min-w-[130px] translate-x-[-10px]' />
                    </div>
                    <ul className="md:flex gap-3 hidden overflow-hidden">
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
                    
                    {/* Custom Solana Wallet Dropdown - client only */}
                    {isClient && (
                      connected && publicKey ? (
                        <div className="relative">
                          <div
                            className="flex items-center gap-2 cursor-pointer bg-[#23242a] rounded-xl px-3 py-2 min-w-[120px]"
                            onClick={() => setDropdownOpen((v) => !v)}
                          >
                            <Image
                              src={avatarUrl}
                              alt="avatar"
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full border-2 border-[#23242a]"
                            />
                            <span className="flex items-center gap-1 text-white font-semibold text-sm">
                              {/* SOL Icon */}
                              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                  <rect width="48" height="48" rx="24" fill="#141414"/>
                                  <g>
                                    <path d="M33.5 31.5C33.5 31.2239 33.2761 31 33 31H15C14.7239 31 14.5 31.2239 14.5 31.5C14.5 31.7761 14.7239 32 15 32H33C33.2761 32 33.5 31.7761 33.5 31.5Z" fill="#00FFA3"/>
                                    <path d="M33.5 24.5C33.5 24.2239 33.2761 24 33 24H15C14.7239 24 14.5 24.2239 14.5 24.5C14.5 24.7761 14.7239 25 15 25H33C33.2761 25 33.5 24.7761 33.5 24.5Z" fill="#00FFA3"/>
                                    <path d="M33.5 17.5C33.5 17.2239 33.2761 17 33 17H15C14.7239 17 14.5 17.2239 14.5 17.5C14.5 17.7761 14.7239 18 15 18H33C33.2761 18 33.5 17.7761 33.5 17.5Z" fill="#00FFA3"/>
                                  </g>
                                </g>
                              </svg>
                              {solBalance}
                            </span>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/></svg>
                          </div>
                          {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-[#18191c] shadow-2xl rounded-2xl py-4 z-50 border border-[#23242a] overflow-hidden animate-fade-in">
                              <div className="flex flex-col gap-2">
                                <Link href="/wallet" className="flex items-center gap-3 px-6 py-3 hover:bg-[#23242a] transition text-white">
                                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4"/><path d="M8 3v4"/></svg>
                                  <span>My Wallet</span>
                                </Link>
                                <Link href="/referral" className="flex items-center gap-3 px-6 py-3 hover:bg-[#23242a] transition text-white">
                                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/></svg>
                                  <span>Referral</span>
                                </Link>
                                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg my-2">
                                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 21h8a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2V7a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2z"/><path d="M12 17v-6"/><path d="M9 14h6"/></svg>
                                  <span>Contest(S6)</span>
                                </div>
                                <div className="flex items-center gap-3 px-6 py-3 hover:bg-[#23242a] transition text-white">
                                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 9h8"/><path d="M8 13h6"/></svg>
                                  <span>TG Alert Tutorial</span>
                                </div>
                                <button
                                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#23242a] transition text-red-400 w-full text-left"
                                  onClick={() => { disconnect(); setDropdownOpen(false); }}
                                >
                                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                                  <span>Disconnect</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          className="bg-gradient-to-br from-[#bfc1c6] to-[#e6e7eb] text-[#23242a] font-[600] rounded-xl px-6 py-2 shadow-md border border-[#e6e7eb] hover:opacity-90 transition"
                          onClick={() => setVisible(true)}
                        >
                          Connect
                        </button>
                      )
                    )}
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
    );
}