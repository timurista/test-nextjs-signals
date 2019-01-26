const withPlugins = require("next-compose-plugins");

const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
// const nextRuntimeDotenv = require("next-runtime-dotenv");

// const withConfig = nextRuntimeDotenv({
//   puiblic: ["API_URL", "ES_INSTANCE", "ES_USERNAME", "ES_PASSWORD"]
// });
require("dotenv").config();

module.exports = withPlugins(
  [[withTypescript], [withCSS], [withSass], [withBundleAnalyzer]],
  {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    publicRuntimeConfig: {
      ES_INSTANCE: process.env.ES_INSTANCE,
      ES_USERNAME: process.env.ES_USERNAME,
      ES_PASSWORD: process.env.ES_PASSWORD
    }
  }
);
