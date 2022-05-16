import Image from 'next/image'
import Countdown from 'react-countdown'
import MintButton from './MintButton'

export default function Mint() {
    return (
        <section
            className="h-[110vh] relative flex w-screen justify-center items-center"
            id="mint"
        >
            <div className="before:content-[''] before:bg-black before:bg-[url('../public/runner1.png')] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-cover before:bg-top before:opacity-30 before:blur w-full h-full flex justify-center items-center">
                <div className="max-w-3/4 flex justify-center items-start m-10 z-20">
                    <Image
                        className="rounded-md aspect-auto flex-1"
                        src="/runner1.png"
                        alt="NFT Image"
                        width="500"
                        height="500"
                    />
                    <div className="flex flex-col h-full pl-24 pt-10">
                        <h2 className="font-lasercorpshalf w-fit text-5xl pb-8">
                            About the Collection
                        </h2>
                        <div className="flex flex-col h-full pl-10">
                            <h3 className="text-3xl">Mint your NFT in</h3>
                            <Countdown
                                date={new Date().getTime()}
                                className="font-anybody font-semibold italic text-5xl py-6"
                            />
                            <ul className="ml-10 pb-10 list-disc text-lg">
                                <li>10 AI generated images</li>
                                <li>Mint on Rinkey testnet</li>
                                <li>
                                    Viewable on Opensea shortly after minting
                                </li>
                            </ul>
                            <MintButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
