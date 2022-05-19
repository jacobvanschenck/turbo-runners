import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export default function Question(props) {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <div className="border-2 rounded-md p-4">
            <button
                className="flex w-full items-center justify-between"
                onClick={() => setIsVisible(!isVisible)}
            >
                <h3 className="text-xl">{props.question}</h3>
                {isVisible ? (
                    <HiChevronUp className="text-2xl" />
                ) : (
                    <HiChevronDown className="text-2xl" />
                )}
            </button>
            {isVisible ? (
                <div className="mt-4 ml-6">{props.children}</div>
            ) : null}
        </div>
    )
}
