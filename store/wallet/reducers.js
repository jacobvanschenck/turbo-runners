import { WALLET_MODAL_IS_VISIBLE } from './actions'

const wallet = (state = { walletModalIsVisible: false }, action) => {
    switch (action.type) {
        case WALLET_MODAL_IS_VISIBLE:
            return {
                ...state,
                walletModalIsVisible: action.isVisible,
            }
        default:
            return state
    }
}

export default wallet
