
export default function LimitHead() {
    return (
        <thead className="whitespace-nowrap border-b-2">
              <tr className="text-accent-aux-1 font-[300] bg-accent-2 text-[12px] z-[10] sticky top-0">
                <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
                    Type
                </th>

                <th className="font-[400] py-3 px-2">
                    <div className="flex items-center gap-1">
                       Token
                    </div>
                </th>


                <th className="font-[400] py-3 px-2">
                    <div className="flex items-center gap-1">
                       Amount
                    </div>
                </th>


                <th className="font-[400] py-3 px-2">
                   Trigger
                </th>

                <th className="font-[400] py-3 px-2">
                    Time
                </th>

                <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
                    Created
                </th>

                <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
                </th>
            </tr>
        </thead>
    )
}
