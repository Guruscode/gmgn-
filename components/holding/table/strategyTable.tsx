import StrategyBody from "./bodys/strategyBody";
import StrategyHead from "./heads/strategyHead";

export default function StrategyTable() {
    return (
        <div className='w-full md:px-[1.3rem] h-[781px] gap-5 overflow-y-auto relative'>
            <div className="relative overflow-auto h-full w-full">
                <div className="overflow-x-auto">
                    <table className="bg-accent-2 w-[1466px] min-w-full">
                        <StrategyHead />
                        <StrategyBody />
                    </table>
                </div>
            </div>
        </div >
    )
}
