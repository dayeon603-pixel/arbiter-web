import Nav from '@/components/site/Nav'
import Hero from '@/components/site/Hero'
import FinanceBlock from '@/components/site/FinanceBlock'
import HowItWorks from '@/components/site/HowItWorks'
import Divider from '@/components/site/Divider'
import DivisionsIndex from '@/components/site/DivisionsIndex'
import Founder from '@/components/site/Founder'
import Footer from '@/components/site/Footer'

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <FinanceBlock />
        {/* Rhythm down the page: cream, dark panel in cream, cream, photo,
            dark, cream, photo, cream, footer. The two dark moments are the
            machine output and the explanation of it — the value shift tracks
            what the content is, not a decorative alternation. */}
        <Divider image="research" />
        <HowItWorks />
        <DivisionsIndex />
        <Divider image="cyber" />
        <Founder />
      </main>
      <Footer />
    </>
  )
}
