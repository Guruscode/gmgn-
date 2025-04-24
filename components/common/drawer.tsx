import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Drawer({ isOpen, onClose, children }) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[20]" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-x-0 bottom-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500"
                                enterFrom="translate-y-full"
                                enterTo="translate-y-0"
                                leave="transform transition ease-in-out duration-500"
                                leaveFrom="translate-y-0"
                                leaveTo="translate-y-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-full h-[70vh]">
                                    <div className="relative flex h-full flex-col pt-3 overflow-y-auto bg-[#17181b] shadow-xl rounded-t-xl">
                                        <div className="absolute top-0 left-[50%] pt-1 cursor-pointer" onClick={onClose}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" fill="currentColor" viewBox="0 0 12 12"><path d="M1.915 4.257a.7.7 0 01.99 0L6.41 7.762l3.505-3.505a.7.7 0 01.99.99L6.41 9.74 1.915 5.246a.7.7 0 010-.99z"></path></svg>
                                        </div>
                                        <div className="px-[20px] overflow-y-auto pb-[65px]">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}