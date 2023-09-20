import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import EventSummary from "@/components/event-detail/EventSummary/EventSummary";
import EventLogistics from "@/components/event-detail/EventLogistics/EventLogistics";
import EventContent from "@/components/event-detail/EventContent/EventContent";
import Comments from "@/components/input/Comments/Comments";
import { ParsedUrlQuery } from "querystring";
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
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

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
      <Comments eventId={event.id} />
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
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = getFeaturedEvents();
  const paths = (await events).map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetail;
