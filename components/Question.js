import { useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

export default function Question(props) {
    const [isVisible, setIsVisible] = useState(false)
    return (
        <details className="border-2 rounded-md p-4 text-justify cursor-pointer group overflow-hidden transition-all duration-1000 max-h-24 lg:max-h-15 open:max-h-[1000px] closed:m-h-24">
            <summary className="md:text-xl">{props.question}</summary>
            <div className="mt-4 mx-4">{props.children}</div>
        </details>
    )
}
