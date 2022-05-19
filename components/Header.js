import Image from 'next/image'
import Link from 'next/link'
import WalletConnectButton from './WalletConnectButton'

const style = {
    wrapper:
        'w-screen h-15 flex justify-between bg-black/50 px-10 py-3 border-b-2 fixed z-30',
    logoContainter: 'flex items-center cursor-pointer',
    logo: '',
    logoText: 'inline font-lasercorpshalf text-2xl',
    headerItems: 'flex items-center',
    headerItem:
        'px-4 mx-2 font-bold border-b-2 border-black/50 hover:text-[#ff2975] hover:border-b-2 hover:border-[#ff2975] cursor-pointer transition ease-out duration-300',
}

export default function Header() {
    return (
        <nav className={style.wrapper}>
            <Link href="/" passHref>
                <div className={style.logoContainter}>
                    <div className={style.logoText}>Turbo Runners</div>
                </div>
            </Link>
            <div className={style.headerItems}>
                <Link href="/#mint" passHref>
                    <div className={style.headerItem}>Mint</div>
                </Link>
                <Link href="/#roadmap" passHref>
                    <div className={style.headerItem}>Roadmap</div>
                </Link>
                <Link href="/#team" passHref>
                    <div className={style.headerItem}>Team</div>
                </Link>
                <Link href="/#faq" passHref>
                    <div className={style.headerItem}>FAQ</div>
                </Link>
                <Link href="https://whitepaper.io/" passHref>
                    <div className={style.headerItem}>Whitepaper</div>
                </Link>
            </div>
            <WalletConnectButton />
        </nav>
    )
}
