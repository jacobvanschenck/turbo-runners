import { combineReducers } from 'redux'
import web3 from './web3/reducers'
import wallet from './wallet/reducers'

const rootReducer = combineReducers({
    web3,
    wallet,
})

export default rootReducer
