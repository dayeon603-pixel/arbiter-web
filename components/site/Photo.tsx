import type { Division } from '@/lib/divisions'

/**
 * Responsive photography. Serves WebP from the generated variant set with a
 * JPEG fallback, and always carries intrinsic width/height so the image
 * reserves its space before it loads.
 *
 * No image in the set has a source above 1600px, so srcset stops there rather
 * than advertising a variant that does not exist.
 */
export default function Photo({
  image,
  sizes,
  priority = false,
  className,
}: {
  image: Division['heroImage']
  sizes: string
  priority?: boolean
  className?: string
}) {
  const { base, alt, width, height } = image
  const widths = [640, 1024, 1600] as const
  const srcSet = widths.map((w) => `/img/${base}-${w}.webp ${w}w`).join(', ')

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img
        src={`/img/${base}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
