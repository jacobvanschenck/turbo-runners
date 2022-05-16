import {
    WEB3_CONNECTION_LOADED,
    WEB3_ACCOUNT_LOADED,
    WEB3_CONTRACT_LOADED,
} from './actions'

const web3 = (state = { account: undefined }, action) => {
    switch (action.type) {
        case WEB3_CONNECTION_LOADED:
            return { ...state, connection: action.connection }
        case WEB3_ACCOUNT_LOADED:
            return { ...state, account: action.account }
        case WEB3_CONTRACT_LOADED:
            return { ...state, contract: action.contract }
        default:
            return state
    }
}

export default web3
