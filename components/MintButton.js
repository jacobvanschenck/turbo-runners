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
        await nft.methods
            .mint(proof, quantity)
            .send({
                from: account,
                value: web3.utils.toWei('0.01'),
            })
            .on('receipt', (receipt) => {
                setIsMinting(false)
                console.log(receipt)
            })
            .on('error', (error) => {
                setIsMinting(false)
                window.alert(`Code: ${error.code}\n${error.message}`)
            })
    }

    return (
        <div className="flex w-full self-center justify-center items-center">
            {isMinting ? (
                <SyncLoader color={'#ff2975'} />
            ) : (
                <div className="flex flex-col-reverse lg:flex-row w-full justify-center items-center my-6">
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
                    {whitelistMintDate > currentTime ||
                    (whitelistMintDate < currentTime &&
                        currentTime < mintDate &&
                        !isWhitelisted) ? (
                        <button
                            className="border-2 text-xl px-6 py-3 mb-4 lg:mb-0 lg:ml-10 rounded-md cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] disabled:cursor-not-allowed disabled:border-slate-200/50 disabled:text-slate-200/50 disabled:bg-black/0 transition ease-out duration-300"
                            disabled={true}
                            onClick={nftMintingHandler}
                        >
                            Minting Not Available Yet
                        </button>
                    ) : (
                        <button
                            className="border-2 text-xl px-6 py-3 mb-4 lg:mb-0 lg:ml-10 rounded-md cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] disabled:cursor-not-allowed disabled:border-slate-200/50 disabled:text-slate-200/50 disabled:bg-black/0 transition ease-out duration-300"
                            disabled={account === undefined}
                            onClick={nftMintingHandler}
                        >
                            {account ? 'Mint Now' : 'Connect Wallet to Mint'}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
