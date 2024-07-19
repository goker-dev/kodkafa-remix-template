import { OpenAPI } from "./client";

export * from "./client";

if (process.env.API_URL) OpenAPI.BASE = process.env.API_URL;
OpenAPI.interceptors.request.use((request) => {
  // console.log("process.env.API_KEY", process.env.API_KEY);
  request.headers?.set("ApiKey", String(process.env.API_KEY));
  return request;
});
