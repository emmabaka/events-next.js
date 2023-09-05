import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import EventsSearch from '@/components/events/EventsSearch/EventsSearch';
import EventList from '@/components/events/EventList/EventList';
import { getAllEvents } from '@/helpers/api-util';
interface Event {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
}

const Events = ({ events }: { events: Event[] }) => {
  const router = useRouter();

  const findEventsHandler = (
    year: string | undefined,
    month: string | undefined
  ) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 600,
  };
};

export default Events;
