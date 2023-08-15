import s from './EventContent.module.scss';

interface Props {
  children: React.ReactNode;
}

function EventContent({children}: Props) {
  return (
    <section className={s.content}>
      {children}
    </section>
  );
}

export default EventContent;
