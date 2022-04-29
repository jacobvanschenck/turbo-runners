export const WALLET_MODAL_IS_VISIBLE = 'WALLET_MODAL_IS_VISIBLE'
export function walletModalIsVisible(isVisible) {
    return {
        type: WALLET_MODAL_IS_VISIBLE,
        isVisible,
    }
}

export const ADDRESS_MODAL_IS_VISIBLE = 'ADDRESS_MODAL_IS_VISIBLE'
export function addressModalIsVisible(isVisible) {
    return {
        type: ADDRESS_MODAL_IS_VISIBLE,
        isVisible,
    }
}
