const CalendarSection = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="overflow-hidden rounded-lg">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=bG9uZG9uc2hhcGVyc2lpaUBnbWFpbC5jb20&ctz=Europe/London&mode=AGENDA"
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default CalendarSection;
