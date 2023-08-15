import EventItem from "../EventItem/EventItem";
import s from "./EventList.module.scss";

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
    <ul className={s.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
