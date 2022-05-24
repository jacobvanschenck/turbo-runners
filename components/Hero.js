import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
    const [counter, setCounter] = useState(8)
    const [isCycling, setIsCycling] = useState(false)

    const cycleImages = async () => {
        const getRandomNumber = () => {
            const counter = Math.floor(Math.random() * 10)
            setCounter(counter)
        }

        if (!isCycling) {
            setInterval(getRandomNumber, 1000)
        }
        setIsCycling(true)
    }

    useEffect(() => {
        cycleImages()
    }, [])

    return (
        <section
            className={`h-[800px] md:h-[1200px] lg:h-[110vh] w-screen relative flex justify-center items-center`}
        >
            <div className="before:content-[''] before:bg-[url('../public/metrocity.png')] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-cover before:bg-top w-full h-full flex justify-center items-center py-6">
                <div className="flex flex-col lg:flex-row justify-center items-center">
                    <div className="flex-col md:w-3/4 lg:w-1/2 justify-center items-center text-center z-10 p-10">
                        <div className="flex flex-col">
                            <h1 className="font-lasercorpsgradient text-5xl md:text-7xl -mb-3">
                                Welcome to
                            </h1>
                            <h1 className="font-lasercorpshalf text-5xl md:text-7xl pb-5">
                                Metrocity
                            </h1>
                        </div>
                        <p className="text-lg mb-6">
                            In a future of control and oppression, Turbo Runners
                            fight for independance and freedom
                        </p>
                    </div>
                    <div className="w-60 md:w-96 lg:w-auto">
                        <Image
                            className="object-contain rounded-md flex-1"
                            src={`/runners/${counter}.png`}
                            alt="NFT Image"
                            width="400"
                            height="400"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
