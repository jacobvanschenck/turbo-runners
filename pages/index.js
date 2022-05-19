import Header from '../components/Header'
import Mint from '../components/Mint'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Roadmap from '../components/Roadmap'
import MeetTheTeam from '../components/MeetTheTeam'
import FAQ from '../components/FAQ'

export default function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <Mint />
            <Roadmap />
            <MeetTheTeam />
            <FAQ />
            <Footer />
        </div>
    )
}
