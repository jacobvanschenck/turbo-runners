import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAccount, loadWeb3 } from '../store/web3Utils'

const style = {
    headerButton: 'border-2 px-5 py-1 rounded-md cursor-pointer',
}

export default function WalletConnect() {
    const dispatch = useDispatch()
    const [web3, setWeb3] = useState(undefined)
    const [account, setAccount] = useState(
        useSelector((state) => state.web3.account)
    )

    const loadAddress = async () => {
        const web3 = await loadWeb3(dispatch)
        const account = await loadAccount(web3, dispatch)
        setWeb3(web3)
        setAccount(account)
    }

    return (
        <button className={style.headerButton} onClick={loadAddress}>
            {account ? account.slice(0, 6) + '...' : 'Connect'}
        </button>
    )
}
