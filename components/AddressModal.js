import Identicon from 'identicon.js'
import Image from 'next/image'
import { AiOutlineClose } from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'
import { IoOpenOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import {
    addressModalIsVisible,
    walletModalIsVisible,
} from '../store/wallet/actions'
import ModalWrapper from './ModalWrapper'

const style = {
    container: 'relative flex flex-col',
    titleContainer: 'relative flex justify-between items-center',
    modalText: 'm-2 font-semibold',
    modalIcon: 'm-2 w-5 h-5 hover:text-slate-600 cursor-pointer',
    addressInfoContainer:
        'flex flex-col justify-between items-center p-4 m-2 rounded-md border border-slate-300',
    addressContainer:
        'flex w-full justify-between items-center text-lg pt-2 pb-4',
    buttonsContainer: 'flex w-full justify-start items-center',
    button: 'flex items-center ml-2 text-xs text-slate-600 hover:text-slate-500 cursor-pointer',
}

export default function AddressModal() {
    const dispatch = useDispatch()
    const isVisible = useSelector((state) => state.wallet.addressModalIsVisible)
    const address = useSelector((state) => state.web3.account)

    return (
        address && (
            <ModalWrapper
                isVisible={isVisible}
                closeHandler={() => dispatch(addressModalIsVisible(false))}
            >
                <div className={style.container}>
                    <div className={style.titleContainer}>
                        <p className={style.modalText}>Account</p>
                        <AiOutlineClose
                            className={style.modalIcon}
                            onClick={() =>
                                dispatch(addressModalIsVisible(false))
                            }
                        />
                    </div>
                    <div className={style.addressInfoContainer}>
                        <div className={style.addressContainer}>
                            <div className="flex">
                                <Image
                                    src={`data:image/png;base64,${new Identicon(
                                        address,
                                        30
                                    ).toString()}`}
                                    alt="Address Identicon"
                                    width={25}
                                    height={25}
                                />
                                <p className="ml-2">
                                    {address
                                        ? address.slice(0, 6) +
                                          '...' +
                                          address.slice(
                                              address.length - 4,
                                              address.length
                                          )
                                        : 'Connect'}
                                </p>
                            </div>
                            <button
                                className="bg-slate-200 rounded-md text-sm px-2 py-1 hover:bg-slate-300"
                                onClick={() =>
                                    dispatch(walletModalIsVisible(true))
                                }
                            >
                                Change
                            </button>
                        </div>
                        <div className={style.buttonsContainer}>
                            <button
                                className={style.button}
                                onClick={() =>
                                    navigator.clipboard.writeText(address)
                                }
                            >
                                <FiCopy className="mr-1" />
                                <p>Copy Address</p>
                            </button>
                            <a
                                className={style.button}
                                href={`https://etherscan.io/address/${address}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <IoOpenOutline className="mr-1 ml-4" />
                                <p>View on Explorer</p>
                            </a>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
        )
    )
}
