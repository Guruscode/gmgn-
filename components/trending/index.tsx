"use client";
import { useEffect, useState } from "react";
import UtilityBar from "./utilityBar";
import Footer from "../common/footer";
import Table from "./table/table1";
import { useSearchParams } from "next/navigation";

export default function Trending() {
    const searchParams = useSearchParams();
    const [switchTabs, setSwitch] = useState('1'); // Default to '1'
    const [timeFrame, setTimeFrame] = useState('1m'); // Default to '1m'
    const [filters, setFilters] = useState({
        raydium: true,
        pump: true,
        moonshot: true,
        risks: false,
        washTraded: false,
        honeypot: false,
        tokenFilters: ["", "", "", "", ""]
    });

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

    const handleTimeFrameChange = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
    };
    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className='h-[90vh] overflow-hidden'>
            <UtilityBar setSwitch={setSwitch} switchTabs={switchTabs} onTimeFrameChange={handleTimeFrameChange} onFiltersChange={handleFiltersChange} />
            <Table timeFrame={timeFrame} filters={filters} />
            <Footer />
        </div>
    );
}