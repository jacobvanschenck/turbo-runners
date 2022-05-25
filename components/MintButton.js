import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SyncLoader from 'react-spinners/SyncLoader'
import {
    getMerkleTree,
    getMerkleProof,
    getMerkleLeaf,
} from '../lib/merkleTreeHelpers'

export default function MintButton() {
    const account = useSelector((state) => state.web3.account)
    const nft = useSelector((state) => state.web3.contract)
    const web3 = useSelector((state) => state.web3.connection)
    const isWhitelisted = useSelector((state) => state.web3.isWhitelisted)
    const currentTime = Date.now()
    const whitelistMintDate = useSelector(
        (state) => state.web3.whitelistMintDate
    )
    const mintDate = useSelector((state) => state.web3.publicMintDate)
    const [quantity, setQuantity] = useState(1)
    const [max, setMax] = useState(0)
    const [isMinting, setIsMinting] = useState(false)
    const [minted, setMinted] = useState(false)
    const [nftId, setNftId] = useState(undefined)
    const [transactionId, setTransactionId] = useState(undefined)

    useEffect(() => {
        setMax(process.env.NEXT_PUBLIC_MAX_MINT_PER_TRANSACTION)
    }, [])

    const increment = () => {
        if (quantity < max) setQuantity(quantity + 1)
    }

    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const getProof = (address) => {
        const tree = getMerkleTree()
        const leaf = getMerkleLeaf(address)
        const proofBuff = getMerkleProof(tree, leaf)
        return proofBuff.map((item) => '0x' + item.data.toString('hex'))
    }

    const nftMintingHandler = async () => {
        const proof = getProof(account)
        setIsMinting(true)
        let value = 0.01 * quantity
        await nft.methods
            .mint(proof, quantity)
            .send({
                from: account,
                value: web3.utils.toWei(value.toString()),
            })
            .on('confirmation', (num, receipt) => {
                console.log(receipt)
                let tokenId
                if (quantity > 1) {
                    tokenId = receipt.events.Transfer[0].returnValues.tokenId
                } else {
                    tokenId = receipt.events.Transfer.returnValues.tokenId
                }
                let transactionHash = receipt.transactionHash
                setNftId(tokenId)
                setTransactionId(transactionHash)
                setMinted(true)
                setIsMinting(false)
            })
            .on('error', (error) => {
                setIsMinting(false)
                window.alert(`Code: ${error.code}\n${error.message}`)
            })
    }

    const mintingAllowed = () => {
        return (
            currentTime > mintDate ||
            (currentTime < mintDate &&
                currentTime > whitelistMintDate &&
                isWhitelisted)
        )
    }

    return (
        <div className="flex w-full self-center justify-center items-center">
            {isMinting ? (
                <SyncLoader color={'#ff2975'} />
            ) : (
                <div className="flex flex-col">
                    <div className="flex flex-col-reverse lg:flex-row w-full justify-center items-center mt-6">
                        <div className="flex items-center">
                            <button
                                className="flex justify-center items-center border-2 text-2xl w-8 h-8 rounded-full cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] transition ease-out duration-300"
                                onClick={decrement}
                            >
                                -
                            </button>
                            <p className="px-4 text-2xl text-[#ff2975]">
                                {quantity}
                            </p>
                            <button
                                className="flex justify-center items-center border-2 text-2xl w-8 h-8 rounded-full cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] transition ease-out duration-300"
                                onClick={increment}
                            >
                                +
                            </button>
                        </div>
                        {account ? (
                            <button
                                className="border-2 text-xl px-6 py-3 mb-4 lg:mb-0 lg:ml-10 rounded-md cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] disabled:cursor-not-allowed disabled:border-slate-200/50 disabled:text-slate-200/50 disabled:bg-black/0 transition ease-out duration-300"
                                disabled={!mintingAllowed()}
                                onClick={nftMintingHandler}
                            >
                                {!mintingAllowed()
                                    ? 'Minting Not Available Yet'
                                    : 'Mint Now'}
                            </button>
                        ) : (
                            <button
                                className="border-2 text-xl px-6 py-3 mb-4 lg:mb-0 lg:ml-10 rounded-md cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] disabled:cursor-not-allowed disabled:border-slate-200/50 disabled:text-slate-200/50 disabled:bg-black/0 transition ease-out duration-300"
                                disabled={account === undefined}
                            >
                                {'Connect Wallet to Mint'}
                            </button>
                        )}
                    </div>
                    {nft && minted && (
                        <div className="flex flex-col">
                            <p className="text-xs md:text-sm mt-4">
                                View your NFT on{' '}
                                <a
                                    className="hover:text-[#ff2975] hover:cursor-pointer hover:border-b-2 hover:border-[#ff2975]"
                                    href={`https://testnets.opensea.io/assets/rinkeby/${nft._address}/${nftId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    OpenSea
                                </a>
                            </p>
                            <p className="text-xs md:text-sm mt-2 mb-4">
                                View the transaction on{' '}
                                <a
                                    className="hover:text-[#ff2975] hover:cursor-pointer hover:border-b-2 hover:border-[#ff2975]"
                                    href={`https://rinkeby.etherscan.io/tx/${transactionId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    etherscan.io
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
