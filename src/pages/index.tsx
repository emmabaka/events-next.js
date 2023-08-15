import Head from "next/head";
import { Inter } from "next/font/google";
import { getFeaturedEvents } from "../../dummy-data";
import EventList from "@/components/events/EventList/EventList";
import s from "./index.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <Head>
        <title>Events | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${s.main} ${inter.className}`}>
        <EventList events={featuredEvents} />
      </main>
    </>
  );
}
