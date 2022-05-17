import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { walletModalIsVisible } from '../store/wallet/actions'
import {
    loadAccount,
    loadContract,
    loadWeb3MetaMask,
    loadWeb3WalletConnect,
} from '../store/web3/web3Utils'
import { AiOutlineClose } from 'react-icons/ai'
import ModalWrapper from '../components/ModalWrapper'

const style = {
    container: 'relative flex flex-col',
    titleContainer: 'relative flex justify-between items-center',
    modalText: 'm-2 font-semibold',
    modalIcon: 'm-2 w-5 h-5 hover:text-slate-600 cursor-pointer',
    walletButtonContainer:
        'flex h-20 justify-between items-center p-4 m-2 rounded-md border-2 border-slate-300 hover:bg-slate-200/50 cursor-pointer',
    walletButtonLabel: 'block',
    walletButtonLogoWrapper: 'relative h-10 w-10',
}

export default function WalletConnectModal() {
    const dispatch = useDispatch()
    const isVisible = useSelector((state) => state.wallet.walletModalIsVisible)

    const loadAddressMetaMask = async () => {
        let web3 = await loadWeb3MetaMask(dispatch)
        await loadAccount(web3, dispatch)
        await loadContract(web3, dispatch)
        dispatch(walletModalIsVisible(false))
    }

    const loadAddressWalletConnect = async () => {
        let web3 = await loadWeb3WalletConnect(dispatch)
        await loadAccount(web3, dispatch)
        await loadContract(web3, dispatch)
        dispatch(walletModalIsVisible(false))
    }

    return (
        <ModalWrapper
            isVisible={isVisible}
            closeHandler={() => dispatch(walletModalIsVisible(false))}
        >
            <div className={style.container}>
                <div className={style.titleContainer}>
                    <p className={style.modalText}>Connect a Wallet</p>
                    <AiOutlineClose
                        className={style.modalIcon}
                        onClick={() => dispatch(walletModalIsVisible(false))}
                    />
                </div>
                <button
                    className={style.walletButtonContainer}
                    onClick={loadAddressMetaMask}
                >
                    <div className={style.walletButtonLabel}>MetaMask</div>
                    <div className={style.walletButtonLogoWrapper}>
                        <Image
                            src="/metamaskIcon.png"
                            alt="MetaMask logo"
                            layout="fill"
                        />
                    </div>
                </button>
                <button
                    className={style.walletButtonContainer}
                    onClick={loadAddressWalletConnect}
                >
                    <div className={style.walletButtonLabel}>WalletConnect</div>
                    <div className={style.walletButtonLogoWrapper}>
                        <Image
                            src="/walletConnectIcon.svg"
                            alt="Wallet Connect logo"
                            layout="fill"
                        />
                    </div>
                </button>
            </div>
        </ModalWrapper>
    )
}
