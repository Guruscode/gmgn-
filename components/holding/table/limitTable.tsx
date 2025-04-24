import LimitBody from "./bodys/limitBody";
import LimitHead from "./heads/limitHead";


export default function LimitTable() {
    return (
        <div className='w-full md:px-[1.3rem] h-[781px] gap-5 overflow-y-auto relative'>
            <div className="relative  h-full w-full">
                <div className="overflow-x-auto">
                    <table className="bg-accent-2 md:w-[1466px] w-[600px] min-w-full">
                        <LimitHead />
                        <LimitBody />
                    </table>
                </div>
            </div>
        </div>
    )
}
