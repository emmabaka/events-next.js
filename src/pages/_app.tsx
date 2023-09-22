import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout/Layout";
import Head from "next/head";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
