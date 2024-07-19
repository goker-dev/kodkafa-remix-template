import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { json, LinksFunction } from "@vercel/remix";
import { ReactNode } from "react";
import Header from "~/components/Header.component";
import Version from "~/components/Version.component";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/assets/fontello/css/fontello.css?url" },
  { rel: "stylesheet", href: "/assets/styles/prism-theme.css?url" },
  { rel: "stylesheet", href: styles },
];

export const loader = async () => {
  // if (!params.clientId) {
  //     throw new Response(`No client ID provided`, {
  //         status: 404
  //     });
  // }
  // const client = await getClient(params.clientId);
  // if (!client) {
  //     throw new Response(`No client found by ID ${params.clientId}`, {
  //         status: 404
  //     });
  // }

  const navigation = [
    {
      text: "GOKER",
      to: "/goker",
    },
    {
      text: "NOTES",
      to: "/@goker",
      icon: "icon-note",
    },
  ];
  return json({ navigation });
};

export function Layout({ children }: { children: ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <Meta />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <Links />
      </head>
      <body className="dark:bg-black overflow-hidden">
        <div
          className="flex flex-col min-w-full min-h-screen bg-gray-50 dark:bg-neutral-900
           text-gray-700 dark:text-gray-300 overflow-hidden"
        >
          <Header navigation={data?.navigation || []} />
          <div className="h-32 min-h-max grow flex flex-col items-stretch overflow-y-auto">
            {children}
          </div>
        </div>
        <Version />
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </>
  );
}
