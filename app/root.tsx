import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import { json, LinksFunction, LoaderFunctionArgs } from "@vercel/remix";
import { ReactNode } from "react";
import { useChangeLanguage } from "remix-i18next/react";
import Header from "~/components/Header.component";
import Version from "~/components/Version.component";
import { navigation } from "~/services/data.server";
import i18nServer from "~/services/i18n.server";
import i18next, { localeCookie } from "~/services/i18n.server";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/assets/fontello/css/fontello.css?url" },
  { rel: "stylesheet", href: "/assets/styles/prism-theme.css?url" },
  { rel: "stylesheet", href: styles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);
  const t = await i18nServer.getFixedT(request);
  const hello = t("hello");
  // return json({ locale });
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

  return json(
    { hello, locale, navigation },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
};

export const handle = {
  i18n: "translation",
};

export function Layout({ children }: { children: ReactNode }) {
  const { locale = "en", navigation } =
    useRouteLoaderData<typeof loader>("root") || {};
  return (
    <html lang={locale}>
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
          <Header navigation={navigation || []} />
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
  const { hello, locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);

  return (
    <>
      <div>{hello}</div>
      {/*<Outlet />*/}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  if (isRouteErrorResponse(error)) {
    return (
      <div className="mx-auto flex flex-col lg:w-1/2 p-4">
        <h1 className="text-3xl text-red-500 pb-4">
          {error.status} {error.statusText}
        </h1>
        <p className="font-mono">{error.data}</p>
      </div>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </>
  );
}
