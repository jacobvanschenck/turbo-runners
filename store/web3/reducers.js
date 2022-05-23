import {
    WEB3_CONNECTION_LOADED,
    WEB3_ACCOUNT_LOADED,
    WEB3_CONTRACT_LOADED,
    PUBLIC_MINT_DATE_SET,
    WHITELIST_MINT_DATE_SET,
    IS_WHITELISTED,
} from './actions'

const web3 = (
    state = {
        account: undefined,
        whitelistMintDate: 0,
    },
    action
) => {
    switch (action.type) {
        case WEB3_CONNECTION_LOADED:
            return { ...state, connection: action.connection }
        case WEB3_ACCOUNT_LOADED:
            return { ...state, account: action.account }
        case WEB3_CONTRACT_LOADED:
            return { ...state, contract: action.contract }
        case PUBLIC_MINT_DATE_SET:
            return { ...state, publicMintDate: action.publicMintDate }
        case WHITELIST_MINT_DATE_SET:
            return { ...state, whitelistMintDate: action.whitelistMintDate }
        case IS_WHITELISTED:
            return { ...state, isWhitelisted: action.isWhitelisted }
        default:
            return state
    }
}

export default web3
