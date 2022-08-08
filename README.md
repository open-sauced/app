<div align="center">
  <br>
  <img alt="Open Sauced" src="https://i.ibb.co/7jPXt0Z/logo1-92f1a87f.png" width="300px">
  <h1>🍕 insights.opensauced.pizza 🍕</h1>
  <strong>The site provides insights to Open Source projects.</strong>
</div>
<br>

## 🖼️ Project Figma

The figma for this project can be found [here](https://www.figma.com/file/OpVX6WT7dmWqnwRuEvADMF/OpenSauced-%E2%80%94-Insights-(insights.opensauced.pizza)).

## 🔬 Atomic Design

This project uses Atomic Design for it's Components. Here are several resources for Atomic Design if you are unfamiliar:

- [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Atomic Design - How To Make Web and UI Design Easier](https://www.youtube.com/watch?v=W3A33dmp17E)

## 📙 Storybook

The Stoybook for this project can be found at [design-insights.opensauced.pizza](https://design-insights.opensauced.pizza). 

### Run it locally

```bash
npm run storybook
```

### Deploy your branch ([video explaining this](https://www.loom.com/share/c3a3fa04a4a343da8228bdb9b9a66746))

Navigate to the [Storybook Action](https://github.com/open-sauced/insights/actions/workflows/storybook.yml). Choose your branch in the "Run Workflow" dropdown.

<img width="1050" alt="storybook action tab" src="https://user-images.githubusercontent.com/5713670/178128835-d81205f3-a875-474f-8b4f-46a1ad814fe1.png">


## 🖥️ Local development

To install the application:

```shell
npm ci
```

To start a local copy of the app on port `3000`:

```shell
npm start
```

To reset your node_modules folder if you're experiencing issues:

```shell
npm run node-reset
```

### 🎨 Code linting

To check the code and styles quality, use the following command:

```shell
npm run lint
```

This will also display during development, but not break on errors.

To fix the linting errors, use the following command:

```shell
npm run format
```

### 🚀 Production deployment

A production deployment is a complete build of the project, including the build of the static assets.

```shell
npm run build
```

## 🤝 Contributing

We encourage you to contribute to Open Sauced! Please check out the [Contributing guide](https://docs.opensauced.pizza/contributing/introduction-to-contributing/) for guidelines about how to proceed.

We have a commit utility called [@open-sauced/conventional-commit](https://github.com/open-sauced/conventional-commit) that helps you write your commits in a way that is easy to understand and process by others.

It is generally integrated as an `npm` script but you can run it with `npx` as well:

```shell
npm run push
```

For any other npm based project or dotnpmrc defaulting to `--yes`:

```shell
npx -y @open-sauced/conventional-commit
```

## 🍕 Community

Got Questions? Join the conversation in our [Discord](https://discord.gg/U2peSNf23P).  
Find Open Sauced videos and release overviews on our [YouTube Channel](https://www.youtube.com/channel/UCklWxKrTti61ZCROE1e5-MQ).
