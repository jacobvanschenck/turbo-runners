import { HiChevronDown } from 'react-icons/hi'

export default function Question(props) {
    return (
        <div className="border-2 rounded-md p-4">
            <input
                type="checkbox"
                id={`sortbox${props.question}`}
                className="hidden absolute peer group"
            />
            <label
                htmlFor={`sortbox${props.question}`}
                className="inline-flex items-center justify-between md:text-xl cursor-pointer"
            >
                <span>{props.question}</span>
            </label>
            <HiChevronDown className="duration-200 inline-flex ml-2 text-xl transition-all peer-checked:rotate-180" />
            <div className="mx-4 overflow-hidden max-h-0 duration-300 transition-all peer-checked:max-h-[1000px]">
                <p className="mt-4">{props.children}</p>
            </div>
        </div>
    )
}
