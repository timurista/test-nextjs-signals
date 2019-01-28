import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
console.log("CONFIG", publicRuntimeConfig);
const { ES_INSTANCE, ES_PASSWORD, ES_USERNAME } = publicRuntimeConfig;
const username = ES_USERNAME;
const password = ES_PASSWORD;
let credentials = Buffer.from(username + ":" + password).toString("base64");
let basicAuth = "Basic " + credentials;
export const baseURL = ES_INSTANCE;
export const headers = { Authorization: basicAuth };
