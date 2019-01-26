console.log("rendering the query", query);
console.log("PROCESS", process.env.ES_INSTANCE);
const username = process.env.ES_USERNAME;
const password = process.env.ES_PASSWORD;
let credentials = Buffer.from(username + ":" + password).toString("base64");
let basicAuth = "Basic " + credentials;
const baseURL = process.env.ES_INSTANCE;

export default (devProxy = {
  "/api": {
    target: "https://exampleapi.co/api/",
    pathRewrite: { "^/api": "/" },
    changeOrigin: true
  },
  "/es": {
    target: baseURL,
    pathRewrite: { "^/es": "/" },
    auth: basicAuth,
    changeOrigin: true
  }
});
