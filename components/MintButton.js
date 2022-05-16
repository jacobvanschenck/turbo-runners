import { useSelector } from 'react-redux'

export default function MintButton() {
    const account = useSelector((state) => state.web3.account)
    return (
        <button
            className="flex border-2 text-xl min-w-max max-w-max px-5 py-2 items-center justify-around rounded-md  cursor-pointer hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] disabled:cursor-default disabled:border-slate-200/50 disabled:text-slate-200/50 disabled:bg-black/0"
            disabled={account === undefined}
        >
            {account ? 'Mint' : 'Connect Wallet to Mint'}
        </button>
    )
}
