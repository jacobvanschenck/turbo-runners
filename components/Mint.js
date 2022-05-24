import Image from 'next/image'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import { useDispatch, useSelector } from 'react-redux'
import { publicMintDateSet, whitelistMintDateSet } from '../store/web3/actions'
import MintButton from './MintButton'

export default function Mint() {
    const currentTime = Date.now()
    const contract = useSelector((state) => state.web3.contract)
    const isWhitelisted = useSelector((state) => state.web3.isWhitelisted)
    const [mintDate, setMintDate] = useState(
        useSelector((state) => state.web3.publicMintDate)
    )
    const [whitelistMintDate, setWhitelistMintDate] = useState(
        useSelector((state) => state.web3.whitelistMintDate)
    )
    const account = useSelector((state) => state.web3.account)
    const dispatch = useDispatch()

    useEffect(() => {
        let publicMintDate = new Date(
            process.env.NEXT_PUBLIC_NFT_PUBLIC_MINT_DATE
        ).getTime()
        let whitelistMintDate = new Date(
            process.env.NEXT_PUBLIC_NFT_WHITELIST_MINT_DATE
        ).getTime()
        setMintDate(publicMintDate)
        setWhitelistMintDate(whitelistMintDate)
        dispatch(whitelistMintDateSet(whitelistMintDate))
        dispatch(publicMintDateSet(publicMintDate))
    }, [dispatch])

    return (
        <section
            className="h-[110vh] relative flex w-screen justify-center items-center"
            id="mint"
        >
            <div className="before:content-[''] before:bg-black before:bg-[url('../public/runner1.png')] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-cover before:bg-top before:opacity-30 before:blur w-full h-full flex justify-center items-center py-6">
                <div className="max-w-3/4 flex flex-col-reverse lg:flex-row justify-center lg:items-start m-10 z-20">
                    <div className="place-self-center flex flex-col items-center">
                        <div className="w-60 md:w-96 lg:w-auto">
                            <Image
                                className="rounded-md aspect-auto flex-1"
                                src="/runner1.png"
                                alt="NFT Image"
                                width="500"
                                height="500"
                            />
                        </div>
                        {contract ? (
                            <div>
                                <p className="text-xs text-center md:text-sm mt-4">
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
                    <div className="flex flex-col h-full lg:pl-24 pt-10 text-center lg:text-left">
                        <h2 className="font-lasercorpshalf w-fit text-4xl md:text-5xl pb-6">
                            Mint Your NFT
                        </h2>
                        <div className="flex flex-col h-full lg:pl-10">
                            {mintDate > currentTime ? (
                                <div className="mb-4">
                                    <h3 className="text-3xl pb-2">
                                        Public Minting Countdown:
                                    </h3>
                                    <Countdown
                                        date={
                                            currentTime +
                                            (mintDate - currentTime)
                                        }
                                        className="font-anybody font-semibold italic tracking-wider text-3xl md:text-4xl lg:text-5xl"
                                    />
                                </div>
                            ) : (
                                <h3 className="text-3xl pb-4">
                                    Minting is Live
                                </h3>
                            )}
                            {whitelistMintDate < currentTime &&
                            currentTime < mintDate ? (
                                <div>
                                    <h3 className="text-3xl pb-4">
                                        Pre-Sale Minting Open
                                    </h3>
                                    {isWhitelisted ? (
                                        <p className="pb-4">
                                            You are one the whitelist!
                                        </p>
                                    ) : (
                                        <button
                                            className="border-2 text-xl px-6 py-3 mb-4 ml-10 rounded-md cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975]"
                                            onClick={() =>
                                                (location.href = `mailto:xyz@yourapplicationdomain.com?subject=Add Me to the Whitelist&body=My address is ${account}`)
                                            }
                                        >
                                            Join the whitelist
                                        </button>
                                    )}
                                </div>
                            ) : null}

                            <ul className="lg:ml-10 pb-4 text-lg ">
                                <li>
                                    Total Supply:{' '}
                                    <span className="text-[#ff2975] pl-2">
                                        10
                                    </span>
                                </li>
                                <li>
                                    Price Per Mint:{' '}
                                    <span className="text-[#ff2975] pl-2">
                                        0.01 ETH
                                    </span>
                                </li>
                                <li>
                                    Max Mint Per Transaction:{' '}
                                    <span className="text-[#ff2975] pl-2">
                                        3
                                    </span>
                                </li>
                                <li>
                                    Max Mint Per Address:{' '}
                                    <span className="text-[#ff2975] pl-2">
                                        5
                                    </span>
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
