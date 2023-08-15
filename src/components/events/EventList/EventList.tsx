import EventItem from "../EventItem/EventItem";

interface EventItemType {
  title: string;
  image: string;
  date: string;
  location: string;
  id: string;
}
interface EventsArrayType {
  events: EventItemType[];
}

const EventList = ({ events }: EventsArrayType) => {
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
