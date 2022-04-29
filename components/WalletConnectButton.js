import Identicon from 'identicon.js'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    walletModalIsVisible,
    addressModalIsVisible,
} from '../store/wallet/actions'

const style = {
    headerButton:
        'flex border-2 px-5 py-1 items-center justify-around rounded-md cursor-pointer',
    imageWrapper: 'flex mr-2 items-center rounded-md',
}

export default function WalletConnect() {
    const dispatch = useDispatch()
    const account = useSelector((state) => state.web3.account)

    const showWalletConnectModal = () => {
        dispatch(walletModalIsVisible(true))
    }

    const showAddressModal = () => {
        dispatch(addressModalIsVisible(true))
    }

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
