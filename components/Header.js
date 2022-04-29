import Image from 'next/image'
import Link from 'next/link'
import WalletConnectButton from './WalletConnectButton'
import logo from '../assests/logoipsum-favicon.svg'

const style = {
    wrapper: 'w-screen flex justify-between px-10 py-3 border-b-2',
    logoContainter: 'flex items-center cursor-pointer',
    logo: '',
    logoText: 'inline ml-2 font-bold text-2xl',
    headerItems: 'flex items-center',
    headerItem: 'px-4 mx-2 font-bold hover:text-blue-600 cursor-pointer',
    headerButton: 'border-2 px-5 py-1 rounded-md cursor-pointer',
}

export default function Header() {
    return (
        <nav className={style.wrapper}>
            <Link href="/" passHref>
                <div className={style.logoContainter}>
                    <Image className={style.logo} src={logo} alt=""></Image>
                    <div className={style.logoText}>Logo Ipsum</div>
                </div>
            </Link>
            <div className={style.headerItems}>
                <Link href="/about" passHref>
                    <div className={style.headerItem}>About</div>
                </Link>
                <Link href="/blog" passHref>
                    <div className={style.headerItem}>Blog</div>
                </Link>
                <Link href="/contact" passHref>
                    <div className={style.headerItem}>Contact</div>
                </Link>
            </div>
            <WalletConnectButton />
        </nav>
    )
}
