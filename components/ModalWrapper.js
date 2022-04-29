import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modalIsVisible } from '../store/wallet/actions'

const style = {
    modalContainer:
        'fixed top-0 left-0 w-full h-full flex items-center z-100 overflow-auto bg-gray-900/50',
    modalContent: 'relative w-96 m-auto bg-white rounded-md p-2',
}

let useClickOutside = (handler) => {
    let domNode = useRef()

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current?.contains(event.target)) handler()
        }

        document.addEventListener('mousedown', maybeHandler)

        return () => {
            document.removeEventListener('mousedown', maybeHandler)
        }
    })

    return domNode
}

export default function ModalWrapper({ children }) {
    const isVisible = useSelector((state) => state.wallet.modalIsVisible)
    const dispatch = useDispatch()
    const modalRef = useClickOutside(() => {
        if (isVisible) {
            dispatch(modalIsVisible(false))
        }
    })

    return (
        isVisible && (
            <div className={style.modalContainer}>
                <div className={style.modalContent} ref={modalRef}>
                    {children}
                </div>
            </div>
        )
    )
}
