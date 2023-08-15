/* eslint-disable @next/next/no-img-element */
import AddressIcon from "../../icons/address-icon";
import DateIcon from "../../icons/date-icon";
import LogisticsItem from "../LogisticsItem/LogisticsItem";
import s from "./EventLogistics.module.scss";

interface Props {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

function EventLogistics({ date, address, image, imageAlt }: Props) {
  const normalizedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={s.logistics}>
      <div className={s.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={s.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{normalizedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
