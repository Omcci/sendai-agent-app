/** @type {import('next').NextConfig} */
interface WebpackConfig {
  resolve: {
    fallback: {
      fs: boolean;
      os: boolean;
      path: boolean;
      [key: string]: boolean;
    };
  };
}

interface NextConfig {
  reactStrictMode: boolean;
  webpack: (config: WebpackConfig) => WebpackConfig;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: WebpackConfig): WebpackConfig => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      os: false,
      path: false,
    };
    return config;
  },
};

module.exports = nextConfig;
