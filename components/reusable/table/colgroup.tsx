import { usePathname } from 'next/navigation'
import React from 'react'

export default function Colgroup() {
    const pathname = usePathname()
    return (
        <>
            {
                pathname == "/" ?
                    (
                        <>

                            <colgroup className="md:block hidden">
                                <col style={{ width: "248px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "102px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "100px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "220px" }} />
                                <col style={{ width: "92px" }} />
                                <col style={{ width: "80px" }} />
                            </colgroup>

                            <colgroup><col style={{ width: "136px" }} />
                                <col style={{ width: "112px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "220px" }} />
                                <col style={{ width: "82px" }} />
                                <col style={{ width: "48px" }} />
                            </colgroup>
                        </>
                    ) : (
                        <>

                            <colgroup className="md:block hidden">
                                <col style={{ width: '290px' }} />
                                <col style={{ width: '107px' }} />
                                <col style={{ width: '131px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '351px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '96px' }} />
                                <col style={{ width: '111px' }} />
                            </colgroup>

                            <colgroup className="block md:hidden">
                                <col style={{ width: '136px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '300px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '82px' }} />
                                <col style={{ width: '48px' }} />
                            </colgroup>
                        </>
                    )
            }
        </>
    )
}
