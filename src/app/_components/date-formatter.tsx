import { parseISO, format } from "date-fns";
import { Timestamp } from "firebase/firestore"; // Import Firebase Timestamp type

type Props = {
  dateString: string | Date | Timestamp | null; // Accept multiple date types
};

const DateFormatter = ({ dateString }: Props) => {
  if (!dateString) {
    return <span>Invalid date</span>;
  }

  // Handle Firebase Timestamp objects
  let date: Date;
  if (dateString instanceof Timestamp) {
    date = dateString.toDate();
  } else if (typeof dateString === "string") {
    // Handle ISO date strings
    date = parseISO(dateString);
  } else {
    // Assume it's a Date object
    date = dateString;
  }

  // Check for invalid date
  if (isNaN(date.getTime())) {
    return <span>Invalid date</span>;
  }

  return (
    <time dateTime={date.toISOString()}>{format(date, "LLLL d, yyyy")}</time>
  );
};

export default DateFormatter;
