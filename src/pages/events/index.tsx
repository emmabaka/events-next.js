import { useRouter } from "next/router";
import EventsSearch from "@/components/events/EventsSearch/EventsSearch";
import EventList from "@/components/events/EventList/EventList";
import { getAllEvents } from "../../../dummy-data";

const Events = () => {
  const events = getAllEvents();
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
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
};

export default Events;
