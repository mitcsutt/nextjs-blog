import { parseISO, format } from 'date-fns';
import { ReactElement } from 'react';

interface DateProps {
  date: Date
}

const Date = ({ date }: DateProps): ReactElement => {
  return <time dateTime={date.toLocaleDateString()}>{format(date, 'LLLL d, yyyy')}</time>;
}

export default Date