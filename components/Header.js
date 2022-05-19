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
        'px-4 mx-2 font-bold hover:text-[#ff2975] hover:border-b-2 hover:border-[#ff2975] cursor-pointer',
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
                <Link href="/gallery" passHref>
                    <div className={style.headerItem}>Gallery</div>
                </Link>
                <Link href="/whitepaper" passHref>
                    <div className={style.headerItem}>Whitepaper</div>
                </Link>
            </div>
            <WalletConnectButton />
        </nav>
    )
}
