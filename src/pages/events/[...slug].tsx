import { useRouter } from "next/router";
import { getFilteredEvents } from "../../../dummy-data";
import EventList from "@/components/events/EventList/EventList";
import ResultsTitle from "@/components/events/ResultTitle/ResultTitle";
import Button from "@/components/ui/Button/Button";
import ErrorAlert from "@/components/ui/ErrorAlert/ErrorAlert";

const FilteredEvents = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = Number(filteredData[0]);
  const filteredMonth = Number(filteredData[1]);

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const dateObject = new Date(filteredYear, filteredMonth - 1);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const date: string = formattedDate;

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEvents;
