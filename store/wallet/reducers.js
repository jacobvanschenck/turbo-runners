import { WALLET_MODAL_IS_VISIBLE, ADDRESS_MODAL_IS_VISIBLE } from './actions'

const wallet = (
    state = {
        walletModalIsVisible: false,
        addressModalIsVisible: false,
    },
    action
) => {
    switch (action.type) {
        case WALLET_MODAL_IS_VISIBLE:
            return {
                ...state,
                walletModalIsVisible: action.isVisible,
                modalIsVisible: action.isVisible,
            }
        case ADDRESS_MODAL_IS_VISIBLE:
            return {
                ...state,
                addressModalIsVisible: action.isVisible,
                modalIsVisible: action.isVisible,
            }
        default:
            return state
    }
}

export default wallet
