"use client";
import { useEffect, useState } from "react";
import UtilityBar from "./utilityBar";
import Footer from "../common/footer";
import Table from "./table/table1";
import { useSearchParams, useRouter } from "next/navigation";

export default function Trending() {
    const searchParams = useSearchParams();
    const router = useRouter();
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
    const [chain, setChain] = useState<string | null>(null);

    // On mount, set chain from URL or localStorage
    useEffect(() => {
        const urlChain = searchParams.get("chain");
        if (urlChain) {
            setChain(urlChain);
            localStorage.setItem("lastSelectedChain", urlChain);
        } else {
            const lastChain = localStorage.getItem("lastSelectedChain") || "sol";
            setChain(lastChain);
            // Update URL if missing
            const params = new URLSearchParams(window.location.search);
            params.set("chain", lastChain);
            router.replace(`?${params.toString()}`);
        }
    }, [searchParams, router]);

    // When chain changes, update URL and localStorage
    const handleChainChange = (newChain: string) => {
        setChain(newChain);
        localStorage.setItem("lastSelectedChain", newChain);
        const params = new URLSearchParams(window.location.search);
        params.set("chain", newChain);
        router.replace(`?${params.toString()}`);
    };

    const handleTimeFrameChange = (newTimeFrame) => {
        setTimeFrame(newTimeFrame);
    };
    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className='h-[90vh] overflow-hidden'>
            <UtilityBar setSwitch={setSwitch} switchTabs={switchTabs} onTimeFrameChange={handleTimeFrameChange} onFiltersChange={handleFiltersChange} chain={chain} />
            {chain ? (
                <Table chain={chain} timeFrame={timeFrame} filters={filters} />
            ) : (
                <div className="flex justify-center items-center h-full">Loading...</div>
            )}
            <Footer />
        </div>
    );
}