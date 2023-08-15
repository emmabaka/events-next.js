import { getAllEvents } from "../../../dummy-data";
import EventList from "@/components/events/EventList/EventList";

const Events = () => {
  const events = getAllEvents();
  return <EventList events={events} />;
};

export default Events;
