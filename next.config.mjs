/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "out",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
