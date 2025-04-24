import React from 'react'

export default function Footer() {
    return (
        <div className='bg-accent-3 w-full h-10 fixed z-10 bottom-0 md:flex hidden items-center justify-between px-[1.3rem] text-accent-1'>
            <div className="">
                <div className="flex items-center text-[13px] font-[600]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.89 13.667a8.002 8.002 0 01-15.78 0c-.072.434-.11-.12-.11.335a8 8 0 0016 0c0-.454-.038.099-.11-.335z"></path><path d="M2 12.334h.889v1.668H2v-1.668z"></path><path d="M17.111 12.334H18v1.668h-.889v-1.668z"></path><path fillRule="evenodd" clipRule="evenodd" d="M10 20.334a8 8 0 100-16 8 8 0 000 16zm0-.889a7.111 7.111 0 100-14.222 7.111 7.111 0 000 14.222z"></path><path d="M16.222 12.334a6.222 6.222 0 11-12.444 0 6.222 6.222 0 0112.444 0z"></path><path d="M20 2l.232.863a2.7 2.7 0 001.905 1.905L23 5l-.863.232a2.7 2.7 0 00-1.905 1.905L20 8l-.232-.863a2.7 2.7 0 00-1.905-1.905L17 5l.863-.232a2.7 2.7 0 001.905-1.905L20 2z"></path></svg>
                    Sniper New
                </div>
            </div>

            <div className="flex items-center gap-5 text-[13px] ">
                <a href="" className='flex items-center font-[500] gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 16 16"><g clipPath="url(#clip0_7329_2240)" fillRule="evenodd" clipRule="evenodd"><path d="M10.642 5.86c.066.037.089.122.05.188-.05.087-.104.23-.13.399-.028.167-.026.349.025.513a.139.139 0 11-.264.083 1.412 1.412 0 01-.036-.64 1.51 1.51 0 01.165-.493.139.139 0 01.19-.05z"></path><path d="M13.473 6.285a2.245 2.245 0 00-3.982-1.152A1.965 1.965 0 006.51 6.85H4.306a.598.598 0 00-1.191 0H3.11a.598.598 0 00-1.192 0h-.002v2.316c0 .193.13.363.316.413l4.512 1.213-1.71 6.25h9.997L13.473 6.286zM2.77 8.786a.139.139 0 01.162-.11l6.033 1.158a.139.139 0 01-.052.273L2.88 8.949a.139.139 0 01-.11-.163zm10.128-2.192a1.594 1.594 0 01-3.067.613 1.412 1.412 0 11-.077-.99 1.595 1.595 0 013.144.377z"></path><path d="M7.93 5.986c.066.038.089.123.05.19-.05.085-.104.23-.13.397-.028.168-.026.35.025.514a.139.139 0 01-.264.083 1.41 1.41 0 01-.035-.64c.031-.197.095-.374.164-.493a.139.139 0 01.19-.051z"></path><path d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"></path></g><defs><clipPath id="clip0_7329_2240"><rect width="16" height="16" rx="8"></rect></clipPath></defs></svg>
                    <p>About</p>
                </a>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 20 20"><g clipPath="url(#clip0_6600_49)"><path d="M5.733 5.133h1.334l7.4 9.8h-1.334l-7.4-9.8z"></path><path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM7.533 4h-4l4.965 6.523L3.933 16h1.8l3.635-4.333L12.667 16H16.6l-5.15-6.815L15.8 4h-1.867l-3.356 4.028L7.533 4z"></path></g><defs><clipPath id="clip0_6600_49"><rect width="20" height="20"></rect></clipPath></defs></svg>
                </a>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 20 20"><g clipPath="url(#clip0_6347_11888)"><path d="M13.27 14.587l1.64-7.734c.146-.68-.245-.949-.691-.782L4.576 9.788c-.659.256-.647.625-.112.792l2.467.77 5.725-3.605c.268-.179.514-.078.313.1l-4.631 4.186-.179 2.545c.257 0 .369-.112.502-.246l1.205-1.16 2.5 1.84c.458.257.782.124.905-.424l-.001.001zM20 10c0 5.524-4.476 10-10 10S0 15.524 0 10 4.476 0 10 0s10 4.476 10 10z"></path></g><defs><clipPath id="clip0_6347_11888"><rect width="20" height="20"></rect></clipPath></defs></svg>
                </a>
                <div className="flex items-center gap-1 text-[13px] font-[600]">
                    <span>ETH:</span>
                    <span>$3,326.93</span>
                </div>
            </div>
        </div>
    )
}
