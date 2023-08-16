import Button from "@/components/ui/Button/Button";
import s from "./ResultTitle.module.scss";

interface Props {
  date: string;
}

function ResultsTitle({ date }: Props) {
  const normalizedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={s.title}>
      <h1 className={s.title}>Events in {normalizedDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
}

export default ResultsTitle;
