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
        <section className="h-[110vh] relative flex w-screen justify-center items-center">
            <div className="">
                <Image
                    className="object-cover object-top absolute opacity-60"
                    src="/metrocity.png"
                    alt="Metrocity"
                    layout="fill"
                    quality={100}
                />
            </div>
            <div className="flex justify-center items-center">
                <div className="flex-col w-1/2 max-w-3xl justify-center items-center z-10 p-10">
                    <div className="flex flex-col items-center">
                        <h1 className="font-lasercorpsgradient text-7xl -mb-3">
                            Welcome to
                        </h1>
                        <h1 className="font-lasercorpshalf text-7xl pb-5">
                            Metrocity
                        </h1>
                    </div>
                    <p className="text-lg text-center mb-6">
                        In a future of control and oppression, Turbo Runners
                        fight for independance and freedom
                    </p>
                </div>
                <div className="">
                    <Image
                        className="object-contain rounded-md flex-1"
                        src={`/runners/${counter}.png`}
                        alt="NFT Image"
                        width="400"
                        height="400"
                    />
                </div>
            </div>
        </section>
    )
}
