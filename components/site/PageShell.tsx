import Nav from './Nav'
import Footer from './Footer'

/**
 * Every page below the homepage. The nav is solid from the top here because
 * there is no hero for it to sit transparently over.
 *
 * Nine pages previously hand-duplicated this nav and footer markup, which is
 * why two of them drifted into using a different contact link than the rest.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav alwaysSolid />
      <main id="main" className="pageshell">{children}</main>
      <Footer />
    </>
  )
}
