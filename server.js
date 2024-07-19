import { createRequestHandler } from "@remix-run/express";
import express from "express";
import * as address from "address";

const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

const app = express();
app.use(
  viteDevServer ? viteDevServer.middlewares : express.static("build/client")
);

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");

// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));
const port = 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
  console.log(`Shareable LAN URL: http://${address.ip()}:${port}`);
});
