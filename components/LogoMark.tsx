/* Arbiter mark — the exact brand logo image (rounded tile, baked transparency). */
export default function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/img/logo.png"
      width={size}
      height={size}
      alt="Arbiter"
      className={className}
      style={{ display: 'block' }}
    />
  )
}
