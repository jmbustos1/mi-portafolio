import { withContentlayer } from "next-contentlayer2";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ignorar errores de TypeScript durante build (SST tiene archivos internos con errores)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Excluir .sst de webpack
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/.sst/**', '**/node_modules/**'],
    };
    return config;
  },

  redirects: async () => {
    return [
      {
        source: "/resume",
        destination:
          "https://docs.google.com/document/d/1jVX1D--iSqTOtFp_wR7tGbtvLeZIu9AAiQSf3bc0-fY/edit?usp=sharing",
        permanent: true,
      },
    ];
  },
};

export default withContentlayer(nextConfig);
