import Image from 'next/image'
import Question from './Question'

export default function FAQ() {
    return (
        <section
            id="faq"
            className="relative flex w-screen justify-center items-center p-24"
        >
            <div>
                <Image
                    className="object-cover object-bottom absolute opacity-60"
                    src="/faq-background.png"
                    alt=""
                    layout="fill"
                    quality={100}
                />
            </div>
            <div className="flex flex-col md:w-10/12 space-y-10 z-10">
                <h2 className="font-lasercorpshalf w-fit text-4xl md:text-5xl lg:text-6xl pb-6 place-self-center text-center">
                    Frequently Asked Questions
                </h2>
                <Question question={'Total Supply?'}>
                    Total Supply: 10 Turbo Runners.
                </Question>
                <Question question={'What will be the mint price?'}>
                    Public Sale Price: starting at 0.01 ETH.
                </Question>
                <Question question={'How can I buy a Turbo Runner?'}>
                    To buy Turbo Runner NFT you need to have some Ethereum
                    (ETH), which you can buy on CoinBase or Binance. Then, if
                    you don&apos;t already have one, you&apos;ll create a
                    MetaMask wallet, where you will transfer your Ethereum
                    (ETH). Select how much Turbo Runners NFTs you want to buy
                    and click the &quot;Mint&quot; button that will appear on
                    our website when the public sale is live.
                </Question>
                <Question question={'How do I get on the whitelist?'}>
                    Contact us or join our discord to learn how to get on our
                    whitlist to mint your Turbo Runners before the public mint.
                </Question>
                <Question
                    question={
                        'Why does my Turbo Runner NFT look like a question mark?'
                    }
                >
                    If you minted your Turbo Runner before the public mint date,
                    your image will be a hidden placeholder until the public
                    mint. At that time, make sure to refresh your Meta Data on
                    OpenSea!
                </Question>
                <Question question={'What will there be royalites?'}>
                    Yes, the amount of royalties is fixed at 5% of the secondary
                    sales
                </Question>
            </div>
        </section>
    )
}
