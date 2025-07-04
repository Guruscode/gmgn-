import TableBody from "./body";
import TableHead from "./head";
import Colgroup from "./colgroup";

interface Filters {
    raydium: boolean;
    pump: boolean;
    moonshot: boolean;
    risks: boolean;
    washTraded: boolean;
    honeypot: boolean;
    tokenFilters: string[];
}

interface TableProps {
    chain: string | null;
    timeFrame: string;
    filters: Filters;
}

export default function Table({ chain, timeFrame, filters }: TableProps) {
    return (
        <div className='w-full md:px-[1.3rem] h-[781px] gap-5 overflow-y-auto relative pb-[50px]'>
            <div className="relative overflow-auto h-full">
                <table className="bg-accent-2">
                    <Colgroup />
                    <TableHead />
                    <TableBody chain={chain} timeFrame={timeFrame} filters={filters} />
                </table>
            </div>
        </div >
    )
}
