import { Provider } from 'react-redux'
import WalletConnectModal from '../components/WalletConnectModal'
import AddressModal from '../components/AddressModal'
import createStore from '../store/configureStore'
import '../styles/globals.css'
import { useEffect } from 'react'

const store = createStore()

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        console.log('mounted')
    }, [])

    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <AddressModal />
            <WalletConnectModal />
        </Provider>
    )
}

export default MyApp
