import TableBody from "./body";
import TableHead from "./head";
import Colgroup from "./colgroup";


export default function Table() {
    return (
        <div className='w-full md:px-[1.3rem] h-[781px] gap-5 overflow-y-auto relative'>
            <div className="relative overflow-auto h-full">
                <table className="bg-accent-2">
                    <Colgroup />
                    <TableHead />
                    <TableBody />
                </table>
            </div>
        </div >
    )
}
