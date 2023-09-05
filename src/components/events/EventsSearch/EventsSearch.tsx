import { FormEvent, useRef } from 'react';
import Button from '@/components/ui/Button/Button';
import s from './EventsSearch.module.scss';

interface Props {
  onSearch: (year: string | undefined, month: string | undefined) => void;
}

const EventsSearch = ({ onSearch }: Props) => {
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current?.value;
    const selectedMonth = monthInputRef.current?.value;

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.controls}>
        <div className={s.control}>
          <label htmlFor='year'>Year</label>
          <select name='year' id='year' ref={yearInputRef}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
          </select>
        </div>
        <div className={s.control}>
          <label htmlFor='month'>Month</label>
          <select name='month' id='month' ref={monthInputRef}>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
        </div>
        <Button>Find Events</Button>
      </div>
    </form>
  );
};

export default EventsSearch;
