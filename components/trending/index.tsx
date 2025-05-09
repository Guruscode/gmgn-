"use client";
import { useEffect, useState } from "react";
import UtilityBar from "./utilityBar";
import Footer from "../common/footer";
import Table from "./table/table1";
import { useSearchParams } from "next/navigation";

export default function Trending() {
    const searchParams = useSearchParams();
    const [switchTabs, setSwitch] = useState('1'); // Default to '1'

    useEffect(() => {
        // Initialize from search params (client-side only)
        const tab = searchParams.get("tab");
        if (tab) {
            setSwitch(tab);
        } else if (window.innerWidth < 768) {
            setSwitch("2");
        }

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSwitch("2");
            } else {
                setSwitch(tab || "1"); // Revert to tab param or default '1'
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [searchParams]);

    return (
        <div className='h-[90vh] overflow-hidden'>
            <UtilityBar setSwitch={setSwitch} switchTabs={switchTabs} />
            <Table /> {/* No need for conditional since both cases show Table */}
            <Footer />
        </div>
    );
}