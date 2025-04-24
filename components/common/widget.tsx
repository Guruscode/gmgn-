import React from 'react';

const MEME_COINS = [
    { id: 1, name: 'Dogecoin', logo: '🐶' },
    { id: 2, name: 'Shiba Inu', logo: '🐕' },
    { id: 3, name: 'Pepe', logo: '🐸' },
    { id: 4, name: 'Bonk', logo: '🏏' },
    { id: 5, name: 'Floki Inu', logo: '🚢' },
    { id: 6, name: 'Samoyedcoin', logo: '🐩' },
    { id: 7, name: 'MonaCoin', logo: '😺' },
    { id: 8, name: 'ElonMogus', logo: '🚀' },
    { id: 9, name: 'WifHat', logo: '🐶' },
    { id: 10, name: 'Kabosu', logo: '🐾' }
];
function MemeCoinsWidget() {
    return (
        <div className="overflow-hidden w-full h-[35px] relative">
            <div className="absolute left-0 right-0 z-10 h-full w-fit px-3 flex justify-center dark:bg-[#111111]">
                <div className="flex gap-1 items-center text-[#ffc762] text-[13px]">
                    <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="fire" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"></path></svg>
                    <p className='uppercase whitespace-nowrap text-white sm:block hidden'>Hot pairs</p>
                </div>
            </div>
            <div
                className="flex animate-slide gap-12 px-4"
            // animate={{
            //     x: [0, -1 * (MEME_COINS.length * 220)],
            //     transition: {
            //         x: {
            //             repeat: Infinity,
            //             duration: 15,
            //             ease: "linear"
            //         }
            //     }
            // }}
            >
                {/* {[...MEME_COINS, ...MEME_COINS].map((coin) => (
                    <div
                        key={`${coin.id}-${Math.random()}`}
                        className="flex-shrink-0 w-fit flex items-center gap-2 text-[12px]"
                    >
                        <div className="text-2xl">{coin.logo}</div>
                        <div>
                            <span className="font-bold mr-2">#{coin.id}</span>
                            <span>{coin.name}</span>
                        </div>
                    </div>
                ))} */}
                <div className="ml-[5rem] flex items-center gap-3">
                    {[...MEME_COINS].map((coin) => (
                        <div
                            key={`${coin.id}-${Math.random()}`}
                            className="flex-shrink-0 w-fit flex items-center gap-2 text-[12px]"
                        >
                            <div className="text-2xl">{coin.logo}</div>
                            <div>
                                <span className="font-bold mr-2">#{coin.id}</span>
                                <span>{coin.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ml-[10rem] flex items-center gap-8">
                    {[...MEME_COINS].map((coin) => (
                        <div
                            key={`${coin.id}-${Math.random()}`}
                            className="flex-shrink-0 w-fit flex items-center gap-2 text-[12px]"
                        >
                            <div className="text-2xl">{coin.logo}</div>
                            <div>
                                <span className="font-bold mr-2">#{coin.id}</span>
                                <span>{coin.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ml-[10rem] flex items-center gap-8">
                    {[...MEME_COINS].map((coin) => (
                        <div
                            key={`${coin.id}-${Math.random()}`}
                            className="flex-shrink-0 w-fit flex items-center gap-2 text-[12px]">
                            <div className="text-2xl">{coin.logo}</div>
                            <div>
                                <span className="font-bold mr-2">#{coin.id}</span>
                                <span>{coin.name}</span>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default MemeCoinsWidget;