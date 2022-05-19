import Image from 'next/image'
import Link from 'next/link'
import { ImTwitter } from 'react-icons/im'

export default function TeamMemberCard(props) {
    return (
        <div className="flex flex-col w-72 rounded-md p-4">
            <div>
                <Image
                    src={props.pic}
                    alt={`profile picture for ${props.name}`}
                    width={250}
                    height={250}
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex justify-start space-x-10 items-center mt-4">
                <div>
                    <h3 className="text-2xl">{props.name}</h3>
                    <h4 className="text-lg mt-2">{props.job}</h4>
                </div>
                <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <ImTwitter className="text-4xl hover:text-[#ff2975] cursor-pointer" />
                </a>
            </div>
            <div className="w-full text-justify mt-4">{props.children}</div>
        </div>
    )
}
