import Identicon from 'identicon.js'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    walletModalIsVisible,
    addressModalIsVisible,
} from '../store/wallet/actions'
import { web3AccountLoaded } from '../store/web3/actions'
import { loadAccount } from '../store/web3/web3Utils'

const style = {
    headerButton:
        'flex border-2 px-5 py-1 items-center justify-around rounded-md hover:bg-[#ff2975] hover:text-white hover:border-[#ff2975] cursor-pointer transition ease-out duration-300',
    imageWrapper: 'flex mr-2 items-center rounded-md',
}

export default function WalletConnect() {
    const dispatch = useDispatch()
    const account = useSelector((state) => state.web3.account)
    const connection = useSelector((state) => state.web3.connection)

    const showWalletConnectModal = () => {
        dispatch(walletModalIsVisible(true))
    }

    const showAddressModal = () => {
        dispatch(addressModalIsVisible(true))
    }

    useEffect(() => {
        if (connection) {
            const provider = connection.currentProvider
            provider.on('accountsChanged', (accounts) => {
                loadAccount(connection, dispatch)
            })
            provider.on('disconnect', () => loadAccount(web3, dispatch))
        }
    }, [connection, dispatch])

    return (
        <button
            className={style.headerButton}
            onClick={account ? showAddressModal : showWalletConnectModal}
        >
            {account && (
                <div className={style.imageWrapper}>
                    <Image
                        src={`data:image/png;base64,${new Identicon(
                            account,
                            30
                        ).toString()}`}
                        alt="Address Identicon"
                        width={20}
                        height={20}
                    />
                </div>
            )}
            {account ? account.slice(0, 6) + '...' : 'Connect'}
        </button>
    )
}
