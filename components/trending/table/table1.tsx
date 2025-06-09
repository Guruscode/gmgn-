import TableBody from "./body";
import TableHead from "./head";
import Colgroup from "./colgroup";

interface TableProps {
    timeFrame: string;
}

export default function Table({ timeFrame }: TableProps) {
    return (
        <div className='w-full md:px-[1.3rem] h-[781px] gap-5 overflow-y-auto relative pb-[50px]'>
            <div className="relative overflow-auto h-full">
                <table className="bg-accent-2">
                    <Colgroup />
                    <TableHead />
                    <TableBody timeFrame={timeFrame} />
                </table>
            </div>
        </div >
    )
}
