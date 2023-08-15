/* eslint-disable @next/next/no-img-element */
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";
import Button from "@/components/ui/Button/Button";
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
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={s.item}>
      <img src={`../../${image}`} alt={title} />
      <div className={s.content}>
        <div>
          <h2>{title}</h2>
        </div>
        <div className={s.date}>
          <DateIcon />
          <time>{normalizedDate}</time>
        </div>
        <div className={s.address}>
          <AddressIcon />
          <address>{formattedAddress}</address>
        </div>
        <div className={s.actions}>
          <Button link={exploreLink}>
            <span>Explore event</span>
            <span className={s.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
