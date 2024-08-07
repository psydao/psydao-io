/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["red-literary-tiglon-645.mypinata.cloud"]
  },
  webpack(config) {
    // use SVGR for icons
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: { plugins: [{ name: "removeViewBox", active: false }] }
          }
        }
      ]
    });
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    };

    return config;
  }
};

module.exports = nextConfig;
