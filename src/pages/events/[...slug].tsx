import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import EventList from '@/components/events/EventList/EventList';
import ResultsTitle from '@/components/events/ResultTitle/ResultTitle';
import Button from '@/components/ui/Button/Button';
import ErrorAlert from '@/components/ui/ErrorAlert/ErrorAlert';
interface Event {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
}

const FilteredEvents = () => {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);
  const router = useRouter();
  const filteredData = router.query.slug as string[];

  const { data, error, isLoading } = useSWR(
    'https://events-ea6e8-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events: Event[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (isLoading) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = Number(filteredData[0]);
  const filteredMonth = Number(filteredData[1]);

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const dateObject = new Date(filteredYear, filteredMonth - 1);

  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name='description'
          content={`All events for ${filteredMonth}/${filteredYear}.`}
        />
      </Head>

      <ResultsTitle date={formattedDate} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEvents;
