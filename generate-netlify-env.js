const fs = require("fs");

// check if script is running in netlify CI
if (process.env.CI === "true") {
  console.log("Running in Netlify CI environment");
  let base = process.env.URL;

  if (process.env.CONTEXT === "deploy-preview") {
    console.log("Running in Netlify deploy-preview environment");

    base = `${process.env.DEPLOY_PRIME_URL}/`;
  } else {
    if (process.env.CHANNEL !== undefined && ["alpha", "beta"].includes(process.env.CHANNEL)) {
      console.log(`Running in Netlify ${process.env.CHANNEL} environment`);

      const { protocol, hostname } = new URL(process.env.URL);
      base = `${protocol}//${process.env.CHANNEL}.${hostname}/`;
    }
  }

  // write BASE_URL env variable to .env file
  fs.writeFileSync(".env.local", `DISABLE_IPX=true\nNEXT_PUBLIC_BASE_URL=${base}`);
}
