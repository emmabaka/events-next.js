import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { getFilteredEvents } from '@/helpers/api-util';
import useSWR from 'swr';
import EventList from '@/components/events/EventList/EventList';
import ResultsTitle from '@/components/events/ResultTitle/ResultTitle';
import Button from '@/components/ui/Button/Button';
import ErrorAlert from '@/components/ui/ErrorAlert/ErrorAlert';
// import { GetServerSideProps } from 'next';
// import { ParsedUrlQuery } from 'querystring';
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

  console.log(data);

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
    console.log(event);

    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  console.log(filteredEvents);

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
      <ResultsTitle date={formattedDate} />
      <EventList events={filteredEvents} />
    </>
  );
};

// interface IParams extends ParsedUrlQuery {
//   slug: string;
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { slug } = context.params as IParams;

//   const filteredData = slug;

//   const filteredYear = Number(filteredData[0]);
//   const filteredMonth = Number(filteredData[1]);

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth < 1 ||
//     filteredMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: { year: filteredYear, month: filteredMonth },
//     },
//   };
// };

export default FilteredEvents;
