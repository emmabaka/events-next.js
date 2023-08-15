import { useRouter } from "next/router";
import { getEventById } from "../../../dummy-data";

const EventDetail = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found</p>;
  }
  return;
};

export default EventDetail;
