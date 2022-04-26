import Head from 'next/head'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import '../styles/globals.css'

const store = configureStore()

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <title>Logo Ipsum</title>
                <link rel="icon" href="/logoipsum-favicon.svg" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
