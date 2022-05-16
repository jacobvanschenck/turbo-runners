import Link from 'next/link'

const style = {
    wrapper: 'w-screen h-32 flex justify-around bg-black px-10 py-3 z-20',
    logoContainter: 'flex items-center cursor-pointer',
    headerItems: 'flex items-center',
    headerItem: 'px-4 mx-2 font-bold hover:text-[#ff2975] cursor-pointer',
}

export default function Footer() {
    return (
        <nav className={style.wrapper}>
            <div className={style.headerItems}>
                <Link href="/#mint" passHref>
                    <div className={style.headerItem}>Insta</div>
                </Link>
                <Link href="/gallery" passHref>
                    <div className={style.headerItem}>Twitter</div>
                </Link>
                <Link href="/whitepaper" passHref>
                    <div className={style.headerItem}>Discord</div>
                </Link>
            </div>
        </nav>
    )
}
