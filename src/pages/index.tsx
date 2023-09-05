import Head from "next/head";
import { GetStaticProps } from 'next';
import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '@/components/events/EventList/EventList';
import s from './index.module.scss';
interface Events {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
}

export default function Home({ events }: { events: Events[] }) {
  return (
    <>
      <Head>
        <title>Events | Home</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>

      <EventList events={events} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};
