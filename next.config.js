const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

// Integrate both "million" and Sentry configurations
const { withSentryConfig } = require("@sentry/nextjs");

const sentryOptions = {
  silent: true,
  org: "opensauced",
  project: "insights",
};

const sentryManualSetupOptions = {
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
};

const mergedConfig = withSentryConfig(nextConfig, sentryOptions, sentryManualSetupOptions);

// Wrap the mergedConfig with million.block() function
module.exports = million.next(mergedConfig);
