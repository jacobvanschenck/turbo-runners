import { Provider } from 'react-redux'
import WalletConnectModal from '../components/WalletConnectModal'
import AddressModal from '../components/AddressModal'
import createStore from '../store/configureStore'
import '../styles/globals.css'
import { useEffect } from 'react'
import Head from 'next/head'

const store = createStore()

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <title>Turbo Runners</title>
            </Head>
            <Component {...pageProps} />
            <AddressModal />
            <WalletConnectModal />
        </Provider>
    )
}

export default MyApp
