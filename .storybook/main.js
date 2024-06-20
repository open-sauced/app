module.exports = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    // set use SWC to true once we upgrade to Next.js 14
    options: { builder: { useSWC: false } },
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["../public"],
};
