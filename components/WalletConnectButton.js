import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { walletModalIsVisible } from '../store/wallet/actions'

const style = {
    headerButton: 'border-2 px-5 py-1 rounded-md cursor-pointer',
}

export default function WalletConnect() {
    const dispatch = useDispatch()
    const [account, setAccount] = useState(
        useSelector((state) => state.web3.account)
    )

    const showWalletConnectModal = () => {
        dispatch(walletModalIsVisible(true))
    }

    return (
        <button className={style.headerButton} onClick={showWalletConnectModal}>
            {account ? account.slice(0, 6) + '...' : 'Connect'}
        </button>
    )
}
