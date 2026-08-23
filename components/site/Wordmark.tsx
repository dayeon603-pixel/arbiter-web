/**
 * The wordmark. Letter-spacing is uniform except for the two pairs that need
 * optical correction at this weight: `RB` closes up because R's leg and B's
 * bowl already create space, and `TE` opens slightly because T's crossbar
 * overhangs E. Kerning by eye, not by metric.
 */
export default function Wordmark() {
  return (
    <span className="wordmark" aria-label="Arbiter">
      A<span className="wordmark__kern-rb">R</span>B<span className="wordmark__kern-it">I</span>
      T<span className="wordmark__kern-te">E</span>R
    </span>
  )
}
