import Photo from './Photo'
import { divisions } from '@/lib/divisions'

/**
 * Full-bleed photographic divider. Carries no copy at all.
 *
 * The art direction was the strongest thing the old site had; what was wrong
 * was body text sitting on top of it. At 55–65vh the image reads as a held
 * breath between sections rather than as a cropped band, which is what the
 * previous ~200px version looked like.
 */
export default function Divider({ image = 'finance' }: { image?: string }) {
  const d = divisions.find((x) => x.heroImage.base === image) ?? divisions[0]
  return (
    <div className="divider" role="presentation">
      <Photo image={d.heroImage} sizes="100vw" className="divider__pic" />
    </div>
  )
}
