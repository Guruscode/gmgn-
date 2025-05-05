import React from "react";
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

const TokenTabs: React.FC = () => {
  const [, setResize] = useState<"vertical" | "horizontal">("vertical")
 

  return (
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
  );
};

export default TokenTabs;