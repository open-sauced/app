/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "www.github.com",
      "github.com",
      "res.cloudinary.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/user/:username/highlights",
        destination: "/user/:username?tab=highlights",
        permanent: true,
      },
      {
        source: "/user/:username/contributions",
        destination: "/user/:username?tab=contributions",
        permanent: true,
      },
      {
        source: "/user/:username/recommendations",
        destination: "/user/:username?tab=recommendations",
        permanent: true,
      },
      {
        source: "/user/:username/requests",
        destination: "/user/:username?tab=requests",
        permanent: true,
      },
      {
        source: "/lists/:listId",
        destination: "/lists/:listId/overview",
        permanent: true,
      },
      {
        source: "/lists/:listId/contributors",
        destination: "/lists/:listId/overview",
        permanent: true,
      },
    ];
  },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "opensauced",
    project: "insights",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
