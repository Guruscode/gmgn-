import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all hosts (not recommended for performance and security)
      },
    ],
  },
  // images: {
  //   domains: [
  //     'd23exngyjlavgo.cloudfront.net',
  //     'adds-token-info-29a861f.s3.eu-central-1.amazonaws.com',
  //     'adds-token-info-29a861f.s3.amazonaws.com',
  //     'logo.moralis.io',
  //     'entities-logos.s3.amazonaws.com'
  //   ],
  // },
};

export default nextConfig;
