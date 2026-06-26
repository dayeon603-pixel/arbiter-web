/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',          // static HTML export → Cloudflare Pages serves out/ directly
  images: { unoptimized: true },
  trailingSlash: true,       // /caravan → /caravan/index.html (clean on static hosts)
}
export default nextConfig
