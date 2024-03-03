/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.licdn.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "tw761tmk-3000.asse.devtunnels.ms",
      "s29xn6icktmcth7q.public.blob.vercel-storage.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tw761tmk-3000.asse.devtunnels.ms",
        port: "",
        pathname: "/uploads",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://tw761tmk-3000.asse.devtunnels.ms",
        "localhost:3000",
      ],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: "html-loader",
      });
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/uploads",
        headers: [{ key: "content-type", value: "multipart/form-data" }],
      },
    ];
  },
};

export default nextConfig;
