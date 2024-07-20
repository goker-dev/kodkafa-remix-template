import { OpenAPI } from "./client";

export * from "./client";

if (process.env.API_URL) OpenAPI.BASE = process.env.API_URL;
else throw new Error("API_URL is required! Check your config.");
OpenAPI.interceptors.request.use((request) => {
  // console.log("process.env.API_KEY", process.env.API_KEY);
  if (request.headers instanceof Headers)
    request.headers?.set("ApiKey", String(process.env.API_KEY));
  return request;
});
