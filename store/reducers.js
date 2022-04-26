import { combineReducers } from 'redux'

import {
    WEB3_CONNECTION_LOADED,
    WEB3_ACCOUNT_LOADED,
    WEB3_CONTRACTS_LOADED,
} from './web3/actions'

const web3 = (state = { account: undefined }, action) => {
    switch (action.type) {
        case WEB3_CONNECTION_LOADED:
            return { ...state, connection: action.connection }
        case WEB3_ACCOUNT_LOADED:
            return { ...state, account: action.account }
        case WEB3_CONTRACTS_LOADED:
            return { ...state, contracts: action.contracts }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    web3,
})

export default rootReducer
