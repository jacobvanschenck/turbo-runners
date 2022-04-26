import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const logger = (store) => (next) => (action) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const middleware = [thunkMiddleware, logger]

const composeEnhancers = compose

export default function configureStore() {
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middleware))
    )
    return store
}
