import Nav from '@/components/site/Nav'
import Hero from '@/components/site/Hero'
import ProofPanel from '@/components/ui/ProofPanel'
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
        {/* The proof panel breaks the grid on purpose — see app/home.css. */}
        <section className="section proofband" aria-label="Sample receipt">
          <div className="content grid">
            <div className="proofband__panel">
              <ProofPanel />
            </div>
          </div>
        </section>
        <FinanceBlock />
        <HowItWorks />
        <Divider />
        <DivisionsIndex />
        <Founder />
      </main>
      <Footer />
    </>
  )
}
