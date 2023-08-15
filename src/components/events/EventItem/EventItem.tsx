/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import s from "./EventItem.module.scss";

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
    <li className={s.item}>
      <img src={`../../${image}`} alt={title} />
      <div className={s.content}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={s.date}>
          <time>{normalizedDate}</time>
        </div>
        <div className={s.address}>
          <address>{formattedAddress}</address>
        </div>
        <div className={s.actions}>
          <Link href={exploreLink} className="">
            Explore event
          </Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
