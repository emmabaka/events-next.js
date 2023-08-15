import s from './EventSummary.module.scss';

interface Props {
  title: string
}

function EventSummary({ title }: Props) {
  return (
    <section className={s.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;