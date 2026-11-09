import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Nivel 0: sitio 100% estático -> S3 + CloudFront (ver deploy/).
  output: "export",
  // El optimizador de next/image necesita servidor.
  images: { unoptimized: true },
  // Rutas como carpetas (/blog/index.html): amistoso con S3/CloudFront.
  trailingSlash: true,
};

export default withContentlayer(nextConfig);
