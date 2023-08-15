/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface EventItemType {
  event: {
    title: string;
    image: string;
    date: string;
    location: string;
    id: string;
  };
}

const EventItem = ({
  event: { title, image, date, location, id },
}: EventItemType) => {
  const normalizedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "/n");
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={`../../${image}`} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <time>{normalizedDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
        <div>
          <Link href={exploreLink}>Explore event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
