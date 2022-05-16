import Image from 'next/image'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useSelector } from 'react-redux'
import MintButton from './MintButton'

export default function Mint() {
    const currentTime = new Date().getTime()
    const [publicMintDate, setPublicMintDate] = useState(new Date())
    const [whitelistMintDate, setWhitelistMintDate] = useState(new Date())
    const contract = useSelector((state) => state.web3.contract)

    useEffect(() => {
        if (contract) {
            ;(async () => {
                let timeDeployed = await contract.methods.timeDeployed().call()
                let allowPublicMintAfter = await contract.methods
                    .allowPublicMintingAfter()
                    .call()
                let allowWhiteListMintingAfter = await contract.methods
                    .allowWhiteListMintingAfter()
                    .call()
                setPublicMintDate(
                    (
                        Number(timeDeployed) + Number(allowPublicMintAfter)
                    ).toString() + '000'
                )
                setWhitelistMintDate(
                    (
                        Number(timeDeployed) +
                        Number(allowWhiteListMintingAfter)
                    ).toString() + '000'
                )
            })()
        }
    }, [contract])

    return (
        <section
            className="h-[110vh] relative flex w-screen justify-center items-center"
            id="mint"
        >
            <div className="before:content-[''] before:bg-black before:bg-[url('../public/runner1.png')] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-cover before:bg-top before:opacity-30 before:blur w-full h-full flex justify-center items-center">
                <div className="max-w-3/4 flex justify-center items-start m-10 z-20">
                    <div>
                        <Image
                            className="rounded-md aspect-auto flex-1"
                            src="/runner1.png"
                            alt="NFT Image"
                            width="500"
                            height="500"
                        />
                        {contract ? (
                            <div>
                                <p className="text-sm mt-4 ml-10">
                                    Collection:{' '}
                                    <a
                                        className="hover:text-[#ff2975] hover:cursor-pointer hover:border-b-2 hover:border-[#ff2975]"
                                        href={`https://rinkeby.etherscan.io/address/${contract._address}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {contract._address}
                                    </a>
                                </p>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className="flex flex-col h-full pl-24 pt-10">
                        <h2 className="font-lasercorpshalf w-fit text-5xl pb-6">
                            About the Collection
                        </h2>
                        <div className="flex flex-col h-full pl-10">
                            <h3 className="text-3xl pb-2">
                                Public Minting Countdown:
                            </h3>
                            <Countdown
                                date={
                                    currentTime + (publicMintDate - currentTime)
                                }
                                className="font-anybody font-semibold italic tracking-wider text-5xl pb-6"
                            />
                            <ul className="ml-10 pb-6 list-disc text-lg">
                                <li>10 AI generated images</li>
                                <li>Mint on Rinkey testnet</li>
                                <li>
                                    Viewable on Opensea shortly after minting
                                </li>
                            </ul>
                            <h3 className="text-3xl pb-2">
                                Pre-Sale Minting Open
                            </h3>
                            <p>You are one the whitelist</p>
                            <MintButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
