import { parseISO, format, isValid } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { Input } from "postcss";

type Props = {
  dateString: string | Date | Timestamp | null; // Support multiple date types, including undefined
};

const DateFormatter = ({ dateString }: Props) => {
  // Define a helper function to parse the date input
  const parseDate = (
    input: string | Date | Timestamp | null | undefined
  ): Date | null => {
    if (!input) return null;

    if (input instanceof Timestamp) {
      return input.toDate();
    }

    if (typeof input === "string") {
      const parsedDate = parseISO(input);
      return isValid(parsedDate) ? parsedDate : null;
    }

    if (input instanceof Date && isValid(input)) {
      return input;
    }

    return null; // Return null for unsupported or invalid formats
  };

  const date = parseDate(dateString);

  if (!date) {
    return <span>Invalid date</span>;
  }

  return (
    <time dateTime={date.toISOString()}>{format(date, "MMMM d, yyyy")}</time>
  );
};

export default DateFormatter;
