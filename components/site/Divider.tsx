import Photo from './Photo'
import { divisions } from '@/lib/divisions'

/**
 * Full-bleed photographic divider. Carries no copy at all — the art direction
 * is good and it earns its place as a breath between sections, but body text
 * never sits on a photograph anywhere on this site.
 */
export default function Divider() {
  const image = divisions[0].heroImage
  return (
    <div className="divider" role="presentation">
      <Photo image={image} sizes="100vw" className="divider__pic" />
    </div>
  )
}
