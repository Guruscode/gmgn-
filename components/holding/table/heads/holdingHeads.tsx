
export default function HoldingHead() {
    return (
        <thead className="whitespace-nowrap border-b-2">
            <tr className="text-accent-aux-1 font-[300] bg-accent-2 text-[12px] z-[10] sticky top-0">
                <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1">
                            Token
                        </button>
                        <span>/</span>
                        <button className="flex items-center gap-1">
                            <span>Last Active</span>
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </th>

                <th className="font-[400] py-3 px-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1">
                            Unrealized
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </th>


                <th className="font-[400] py-3 px-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1">
                            Total Profit
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </th>


                <th className="font-[400] py-3 px-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1">
                            Balance
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                                </svg>
                            </span>
                        </button>
                        <div className="space-x-1 flex items-center text-[12px]">
                            <span>USD</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="#5C6068" viewBox="0 0 16 16"><g clipPath="url(#clip0_7009_491)"><path d="M5.89 1.305a.5.5 0 01.371-.602 7.503 7.503 0 017.19 12.452.5.5 0 01-.816-.131l-1.087-2.312a.5.5 0 01.905-.425l.755 1.606A6.502 6.502 0 006.493 1.675a.5.5 0 01-.602-.37z"></path><path d="M2.992 2.695a.5.5 0 01.374.281l1.087 2.31a.5.5 0 01-.905.426l-.755-1.605a6.502 6.502 0 006.714 10.218.5.5 0 01.232.973A7.503 7.503 0 012.55 2.845a.5.5 0 01.442-.15z"></path><path d="M5.5 7A1.5 1.5 0 017 5.5h.5V5a.5.5 0 111 0v.5H10a.5.5 0 010 1H7a.5.5 0 100 1h2a1.5 1.5 0 110 3h-.5v.5a.5.5 0 01-1 0v-.5H6a.5.5 0 010-1h3a.5.5 0 000-1H6.997A1.5 1.5 0 015.5 7z"></path></g><defs><clipPath id="clip0_7009_491"><rect width="16" height="16"></rect></clipPath></defs></svg>
                        </div>
                    </div>
                </th>

                <th className="font-[400] py-3 px-2">
                    <div className="flex items-center gap-1">
                        Holding Duration
                    </div>
                </th>

                <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1">
                            Bought
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                                </svg>
                            </span>
                        </button>
                        <span>/</span>
                        <button className="flex items-center gap-1">
                            <span>Avg</span>
                        </button>
                    </div>
                </th>

                <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
                    <div className="flex items-center gap-1">
                        <button className="flex items-center gap-1">
                            Sold
                            <span aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" viewBox="0 0 7 7">
                                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                                </svg>
                            </span>
                        </button>
                        <span>/</span>
                        <button className="flex items-center gap-1">
                            <span>Avg</span>
                        </button>
                    </div>
                </th>
            </tr>
        </thead>
    )
}
