import Link from 'next/link'
import { ImTwitter } from 'react-icons/im'
import { IoLogoDiscord } from 'react-icons/io5'
import { AiFillInstagram } from 'react-icons/ai'

const style = {
    wrapper:
        'w-screen min-h-fit md:h-20 flex flex-col-reverse md:flex-row justify-evenly items-center border-t-2 border-white bg-black px-10 py-6 z-20',
    headerItems: 'flex items-center my-6',
    headerItem:
        'flex items-center px-4 mx-2 font-bold hover:text-[#ff2975] cursor-pointer  transition ease-out duration-300',
}

export default function Footer() {
    return (
        <footer className={style.wrapper}>
            <div className={style.headerItems}>
                <p>© 2022 by Turbo Runners</p>
            </div>
            <div className={style.headerItems}>
                <Link href="https://www.instagram.com/" passHref>
                    <div className={style.headerItem}>
                        <AiFillInstagram />
                        <p className="ml-2">Insta</p>
                    </div>
                </Link>
                <Link href="https://twitter.com/" passHref>
                    <div className={style.headerItem}>
                        <ImTwitter />
                        <p className="ml-2">Twitter</p>
                    </div>
                </Link>
                <Link href="https://discord.com/" passHref>
                    <div className={style.headerItem}>
                        <IoLogoDiscord />
                        <p className="ml-2">Discord</p>
                    </div>
                </Link>
            </div>
        </footer>
    )
}
