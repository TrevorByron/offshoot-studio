import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      // Serve Recibook prototype routes without .html (iframe navigation)
      {
        source: "/case-studies/recibook/prototype",
        destination: "/case-studies/recibook/prototype/index.html",
      },
      {
        source: "/case-studies/recibook/prototype/recipes",
        destination: "/case-studies/recibook/prototype/recipes.html",
      },
      {
        source: "/case-studies/recibook/prototype/recipe",
        destination: "/case-studies/recibook/prototype/recipe.html",
      },
      {
        source: "/case-studies/recibook/prototype/fetching",
        destination: "/case-studies/recibook/prototype/fetching.html",
      },
    ];
  },
};

export default nextConfig;
