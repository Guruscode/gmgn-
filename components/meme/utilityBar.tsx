"use client";
import React, { useCallback } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { updateUrlParams } from "@/lib/utils";

export default function UtilityBar({ setSwitch, switchTabs }) {
    const paramSearch = useSearchParams();
    const getMemeTab = useCallback(() => paramSearch.get("tab"), [paramSearch]);

    return (
        <div className="md:px-[1.3rem] px-[.5rem] py-[1rem] flex gap-2 flex-col md:flex-row justify-between items-center">
            <div className="w-full flex flex-col justify-center gap-5">
                {/* tabs */}
                <div className="flex items-center gap-2 ">
                    <button
                        className={`font-[700] text-[16px] whitespace-nowrap flex items-center gap-1  ${switchTabs == "1"
                            ? "dark:text-[#f5f5f5]  text-[#111111]"
                            : "dark:text-[#f5f5f5]/40 grayscale text-[#111111]/40"
                            }`}
                        onClick={() => {
                            setSwitch("1");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <g clipPath="url(#clip0_8532_4982)">
                                <rect
                                    x="10.5"
                                    y="-1.5"
                                    width="9.296"
                                    height="16.971"
                                    rx="4.648"
                                    transform="rotate(45 10.5 -1.5)"
                                    fill="#fff"
                                ></rect>
                                <path
                                    d="M4.703 4.297L1.786 7.213a4.648 4.648 0 106.574 6.574l2.916-2.917-6.573-6.573z"
                                    fill="#52D48F"
                                ></path>
                                <path
                                    d="M7.865 13.291A3.948 3.948 0 112.28 7.708l5.427-5.426a3.948 3.948 0 115.583 5.583L7.865 13.29zm5.921-11.504a4.648 4.648 0 00-6.573 0L1.787 7.213a4.648 4.648 0 106.573 6.574l5.427-5.427a4.648 4.648 0 000-6.573z"
                                    fill="#044735"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_8532_4982">
                                    <rect width="16" height="16" fill="#fff"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        Meme
                    </button>

                    <button
                        className={`font-[700] text-[16px] whitespace-nowrap flex items-center gap-1 ${switchTabs == "2"
                            ? "dark:text-[#f5f5f5] text-[#111111]"
                            : "dark:text-[#f5f5f5]/40 grayscale text-[#111111]/40"
                            }`}
                        onClick={() => {
                            setSwitch("2");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14px"
                            height="14px"
                            className={`${switchTabs == "2" ? "text-[#dfff18]" : ""}`}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <g clipPath="url(#clip0_8890_490)">
                                <path d="M15.807 10.498c.126-.372-.29-.676-.65-.521A6.703 6.703 0 016.574.702c.182-.347-.089-.785-.47-.688a8.119 8.119 0 109.701 10.484z"></path>
                                <path d="M13.3 1.284a.447.447 0 01.73.387l-.148 1.535a1.34 1.34 0 00.365 1.055l1.076 1.125c.297.31.027.82-.396.75L13.39 5.88a1.34 1.34 0 00-1.078.292l-1.185.987a.447.447 0 01-.731-.387l.149-1.535a1.34 1.34 0 00-.366-1.055L9.105 3.056a.447.447 0 01.396-.75l1.536.257a1.34 1.34 0 001.078-.292l1.185-.987z"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_8890_490">
                                    <rect width="16" height="16"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        Moonshoot
                    </button>
                </div>

                <div className="w-full flex md:flex-nowrap flex-wrap gap-3">
                    {/* pump tab */}
                    {switchTabs == 1 && <div className="flex items-center gap-2">
                        <div className="bg-transparent rounded-[8px] inline-flex items-center flex-wrap">
                            <div
                                onClick={() => {
                                    updateUrlParams({ tab: "home" });
                                }}
                                className={`px-[12px] md:flex hidden ${getMemeTab() == "home" || getMemeTab() == "" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"} border cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                                Pump
                            </div>
                            <div
                                onClick={() => {
                                    updateUrlParams({ tab: "new-creation" });
                                }}
                                className={`px-[12px] flex ${getMemeTab() == "new-creation" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"} border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                                New Creation
                            </div>
                            <div
                                onClick={() => {
                                    updateUrlParams({ tab: "completing" });
                                }}
                                className={`px-[12px] flex ${getMemeTab() === "completing" ? "bg-accent-3 text-[#f5f5f5]" : "bg-transparent dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                                Completing
                            </div>
                            <div
                                onClick={() => {
                                    updateUrlParams({ tab: "completed" });
                                }}
                                className={`px-[12px] flex ${getMemeTab() == "completed" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center rounded-br-[8px] rounded-tr-[8px]`}>
                                Completed
                            </div>
                            <div
                                onClick={() => {
                                    updateUrlParams({ tab: "soaring" });
                                }}
                                className={`px-[12px] flex ${getMemeTab() == "soaring" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                                Soaring
                            </div>
                            <a
                                target="_blank"
                                href="https://t.me/pump_sol_alert"
                                className="flex md:ml-2 h-[28px] text-[12px] md:mt-0 mt-1 items-center gap-[4px] rounded-[8px] border font-[500] cursor-pointer max-w-[150px] md:px-[12px] px-[6px]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14px"
                                    height="14px"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <g clipPath="url(#clip0_8564_5508)">
                                        <rect
                                            x="1"
                                            y="10"
                                            width="3"
                                            height="1"
                                            transform="rotate(90 1 10)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="6"
                                            y="16"
                                            width="3"
                                            height="1"
                                            transform="rotate(-180 6 16)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="7"
                                            y="6"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 7 6)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="8"
                                            y="7"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 8 7)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="9"
                                            y="8"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 9 8)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="4"
                                            y="7"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 4 7)"
                                            fill="#128B4B"
                                        ></rect>
                                        <path
                                            d="M6 8V7H5v1H4v1H3v1H2v3h1v1h1v-1h1v-1h1v-1h1v-1h1V9H7V8H6z"
                                            fill="#52D48F"
                                        ></path>
                                        <rect
                                            x="9"
                                            y="12"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 9 12)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="5"
                                            y="6"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 5 6)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="10"
                                            y="11"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 10 11)"
                                            fill="#128B4B"
                                        ></rect>
                                        <path d="M13 1v1h-3V1h3z" fill="#E9E9E9"></path>
                                        <path d="M9 3V2h1v1H9z" fill="#E9E9E9"></path>
                                        <path d="M8 4V3h1v1H8z" fill="#E9E9E9"></path>
                                        <path d="M7 5V4h1v1H7z" fill="#E9E9E9"></path>
                                        <path d="M7 5v1H6V5h1z" fill="#E9E9E9"></path>
                                        <path d="M14 3V2h-1v1h1z" fill="#E9E9E9"></path>
                                        <path
                                            d="M10 9v1h1V9h1V8h1V7h1V6h1V3h-1v1h-1v1h-1v1h-1v1h-1v1H9v1h1z"
                                            fill="#E9E9E9"
                                        ></path>
                                        <rect
                                            x="3"
                                            y="8"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 3 8)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="2"
                                            y="9"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 2 9)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="8"
                                            y="13"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 8 13)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="7"
                                            y="14"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 7 14)"
                                            fill="#128B4B"
                                        ></rect>
                                        <rect
                                            x="2"
                                            y="13"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 2 13)"
                                            fill="#128B4B"
                                        ></rect>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M6 7V6H5v1H4v1H3v1H2v1H1v3h1v1h1v1h3v-1h1v-1h1v-1h1v-1h1v-1H9V9H8V8H7V7H6zm0 0v1h1v1h1v1H7v1H6v1H5v1H4v1H3v-1H2v-3h1V9h1V8h1V7h1z"
                                            fill="#31BD72"
                                        ></path>
                                        <rect
                                            x="3"
                                            y="14"
                                            width="1"
                                            height="1"
                                            transform="rotate(90 3 14)"
                                            fill="#128B4B"
                                        ></rect>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 0h3v1h-3V0zM9 2V1h1v1H9zM8 3V2h1v1H8zM7 4V3h1v1H7zM6 5V4h1v1H6zm0 0v1H5V5h1zm8-3h-1V1h1v1zm1 1h-1V2h1v1zm0 3V3h1v3h-1zm-1 1V6h1v1h-1zm-1 1V7h1v1h-1zm-1 1V8h1v1h-1zm-1 1V9h1v1h-1zm-1 0v1h1v-1h-1zm0 0H9V9h1v1z"
                                            fill="#128B4B"
                                        ></path>
                                        <path
                                            d="M13 2h-3v1H9v1H8v1H7v2h1v1h2V7h1V6h1V5h1V4h1V3h-1V2z"
                                            fill="#fff"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_8564_5508">
                                            <rect width="16" height="16" fill="#fff"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>{" "}
                                Pump Alert{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16px"
                                    height="16px"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.293 4.293a1 1 0 011.414 0l4.859 4.858a1.2 1.2 0 010 1.697l-4.859 4.86a1 1 0 01-1.414-1.415L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>}

                    {/* moonshot */}
                    {switchTabs == 2 && <div className="bg-transparent rounded-[8px] inline-flex items-center flex-wrap">
                        <div
                            onClick={() => {
                                updateUrlParams({ tab: "home" });
                            }}
                            className={`px-[12px] md:flex hidden border ${getMemeTab() == "home" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"} cursor-pointer text-[12px] rounded-tl-[8px] rounded-bl-[8px] mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                            Moonshoot
                        </div>
                        <div
                            onClick={() => {
                                updateUrlParams({ tab: "new-creation" });
                            }}
                            className={`px-[12px] flex ${getMemeTab() == "new-creation" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                            New Creation
                        </div>
                        <div
                            onClick={() => {
                                updateUrlParams({ tab: "completing" });
                            }}
                            className={`px-[12px] flex ${getMemeTab() == "completing" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                            Completing
                        </div>
                        <div
                            onClick={() => {
                                updateUrlParams({ tab: "soaring" });
                            }}
                            className={`px-[12px] flex ${getMemeTab() == "soaring" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center`}>
                            Soaring
                        </div>
                        <div
                            onClick={() => {
                                updateUrlParams({ tab: "completed" });
                            }}
                            className={`px-[12px] flex ${getMemeTab() == "completed" ? "bg-accent-3 dark:text-[#f5f5f5]" : "bg-transparent  dark:text-accent-aux-1"}  border cursor-pointer text-[12px]  mr-[-1px] items-center h-[28px] whitespace-nowrap justify-center rounded-br-[8px] rounded-tr-[8px]`}>
                            Completed
                        </div>
                    </div>}

                </div>

            </div>

            {/* utility */}
            <div className="flex whitespace-nowrap gap-3 md:justify-normal justify-between items-center md:w-auto w-full md:space-y-0 space-y-2">
                <div className="flex  items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex items-center gap-1 text-accent-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="min-w-[14px]"
                                    width="14px"
                                    height="14px"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <g clipPath="url(#clip0_10037_38)">
                                        <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z"></path>
                                        <path d="M2.997 8c0 .425.345.76.76.76h8.486a.75.75 0 00.75-.76.752.752 0 00-.76-.76H3.757a.758.758 0 00-.76.76z"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_10037_38">
                                            <rect width="16" height="16"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p className="text-[12px] leading-[1] text-left">
                                    Filter Token
                                </p>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px] space-y-1 p-2 dark:bg-[#26282c]">
                            <DropdownMenuLabel className="font-[400] text-[12px] text-[rgb(110,114,125)]">
                                Filter Token
                            </DropdownMenuLabel>
                            <div className="flex flex-col space-y-2">
                                <div className="">
                                    <input
                                        type="text"
                                        name="filter-1"
                                        className="outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]"
                                        placeholder="filter 1"
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        name="filter-2"
                                        className="outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]"
                                        placeholder="filter 2"
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        name="filter-3"
                                        className="outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]"
                                        placeholder="filter 3"
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        name="filter-4"
                                        className="outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]"
                                        placeholder="filter 4"
                                    />
                                </div>
                                <div className="">
                                    <input
                                        type="text"
                                        name="filter-5"
                                        className="outline-none border capitalize font-normal dark:bg-transparent text-[14px] px-1 py-1 rounded-md w-full focus:border-[#111111] hover:border-[#111111]"
                                        placeholder="filter 5"
                                    />
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <div className="flex gap-2 justify-between">
                                <button className="bg-[#E2E8F0] dark:bg-[#393c43] font-[600] rounded-md text-[12px] py-1 w-full">
                                    Reset
                                </button>
                                <button className="bg-[#111111] dark:bg-white font-[600] rounded-md text-white dark:text-black text-[12px] py-1 w-full">
                                    Apply
                                </button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center flex-wrap lg:flex-nowrap w-full gap-2">
                        <div className="flex items-center gap-1">
                            <Checkbox id="filter wash traded" />
                            <label
                                htmlFor="filter wash traded"
                                className="text-[12px] cursor-pointer leading-[1] text-left capitalized"
                            >
                                Filter wash traded
                            </label>
                        </div>
                    </div>
                    {/*  */}

                    <div className="flex items-center gap-1 dark:bg-[#111111] bg-[#f5f5f5] dark:text-[#f5f5f5] text-[#111111]">
                        <Sheet>
                            <SheetTrigger className="flex items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16px"
                                            height="16px"
                                            fill="#88D693"
                                            viewBox="0 0 16 16"
                                        >
                                            <g clipPath="url(#clip0_9339_171)">
                                                <path d="M3.229 9.046L9.756 0 8.452 6.637h3.757a.2.2 0 01.162.317L5.844 16 7.03 9.363H3.39a.2.2 0 01-.161-.317z"></path>
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M1.5 8a6.5 6.5 0 017.933-6.341L9.63.678A7.5 7.5 0 004.9 14.832l.187-1.02A6.5 6.5 0 011.5 8zm4.663 6.237l-.174.99a7.5 7.5 0 004.781-14.2l-.231.987a6.502 6.502 0 01-4.376 12.223z"
                                                ></path>
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M6.711 1.63c.508-.133 1.013.827.681 1.602-.335.78.978-.978 1.497-1.866L7.023.813l-.312.818zm1.575 10.985c-.345.54-.673 1.897.343 1.85 1.052-.049-.925.19-2.074.124 0 0 2.075-2.513 1.73-1.974z"
                                                ></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_9339_171">
                                                    <rect width="16" height="16"></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <svg
                                        width="100%"
                                        height="auto"
                                        style={{ width: "59.85px" }}
                                        viewBox="0 0 59.849998474121094 17"
                                    >
                                        <defs>
                                            <linearGradient
                                                id="gridientf956b6abff477fdd"
                                                x1="0"
                                                y1="0"
                                                x2="100%"
                                                y2="0"
                                            >
                                                <stop offset="26.87%" stopColor="#88D693"></stop>
                                                <stop offset="64.85%" stopColor="#1CC9FF"></stop>
                                            </linearGradient>
                                        </defs>
                                        <text
                                            x="50%"
                                            y="50%"
                                            dy="0.3em"
                                            textAnchor="middle"
                                            fill="url(#gridientf956b6abff477fdd)"
                                            fontSize="12"
                                            fontWeight="500"
                                        >
                                            <tspan className="">Quick Buy</tspan>
                                        </text>
                                    </svg>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    height="20px"
                                    fill="#F5F5F5"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M8.652 2.05a2.75 2.75 0 012.696 0l4.977 2.8a2.75 2.75 0 011.402 2.397v5.51a2.75 2.75 0 01-1.402 2.397l-4.977 2.8a2.75 2.75 0 01-2.696 0l-4.978-2.8a2.75 2.75 0 01-1.402-2.397v-5.51c0-.994.536-1.91 1.402-2.397l4.978-2.8zm1.96 1.308a1.25 1.25 0 00-1.225 0l-4.977 2.8a1.25 1.25 0 00-.638 1.089v5.51c0 .451.244.868.638 1.09l4.977 2.799c.38.214.845.214 1.226 0l4.977-2.8a1.25 1.25 0 00.637-1.09v-5.51a1.25 1.25 0 00-.637-1.089l-4.977-2.8z"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10 8.133a1.866 1.866 0 100 3.733 1.866 1.866 0 000-3.733zM6.634 9.999a3.366 3.366 0 116.733 0 3.366 3.366 0 01-6.733 0z"
                                    ></path>
                                </svg>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will permanently delete
                                        your account and remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
}
