import { getEventById, getAllEvents } from '@/helpers/api-util';
import EventSummary from '@/components/event-detail/EventSummary/EventSummary';
import EventLogistics from '@/components/event-detail/EventLogistics/EventLogistics';
import EventContent from '@/components/event-detail/EventContent/EventContent';
import ErrorAlert from '@/components/ui/ErrorAlert/ErrorAlert';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
interface Event {
  id: string;
  date: string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
}

const EventDetail = ({ selectedEvent }: { selectedEvent: Event }) => {
  const event = selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  eventId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { eventId } = context.params as IParams;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = getAllEvents();
  const paths = (await events).map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default EventDetail;
