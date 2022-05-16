import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const logger = (store) => (next) => (action) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

const middleware = [thunkMiddleware, logger]

export default function createStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: middleware,
    })
    return store
}
