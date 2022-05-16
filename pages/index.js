import Header from '../components/Header'
import Mint from '../components/Mint'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Mint />
            <Footer />
        </div>
    )
}
