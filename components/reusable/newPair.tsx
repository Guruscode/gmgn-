"use client";
import { useEffect, useState } from "react"
import UtilityBar from "./utilityBar"
import Feed from "./feed"
import Footer from "../common/footer"
import Table from "./table/table1";
import { usePathname, useSearchParams } from "next/navigation";

export default function Meme() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [switchTabs, setSwitch] = useState(searchParams.get("tab") || '1')
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSwitch("2")
        }

        const resize = () => {
            if (window.innerWidth < 768) {
                setSwitch("2")
            } else if (window.innerWidth > 768) {
                setSwitch("1")
            }
        }
        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])



    return (
        <div className='h-[90vh] overflow-hidden'>
            <UtilityBar setSwitch={setSwitch} switchTabs={switchTabs} />
            {
                switchTabs == '1' ?
                    (
                        pathname == "/" || pathname == "/trending" ? (
                            <Table />
                        ) : (
                            <Feed />
                        )
                    ) :
                    <Table />
            }
            <Footer />
        </div>
    )
}
