import Image from 'next/image'
import Countdown from 'react-countdown'

export default function Mint() {
    return (
        <section className="h-[110vh] relative flex w-screen justify-center items-center">
            <h1>About the Collection</h1>
            <div>
                <div className="">
                    <Image
                        className=""
                        src="/2f90595b58416daee0f5.png"
                        alt="NFT Image"
                        width="400"
                        height="400"
                    />
                </div>
                <div>
                    <h2>Mint your NFT in</h2>
                    <Countdown date={new Date().getTime()} />
                    <ul>
                        <li>10 AI generated images</li>
                        <li>Mint on Rinkey testnet</li>
                        <li>Viewable on Opensea shortly after minting</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
