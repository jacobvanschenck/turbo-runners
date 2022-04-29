export const WALLET_MODAL_IS_VISIBLE = 'WALLET_MODAL_IS_VISIBLE'
export function walletModalIsVisible(isVisible) {
    return {
        type: WALLET_MODAL_IS_VISIBLE,
        isVisible,
    }
}
