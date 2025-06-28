import * as SETTINGS from "@/lib/settings";

const CalendarSection = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="overflow-hidden rounded-lg">
        <iframe
          src={SETTINGS.HUB_CONFIG.CALENDAR_EMBED_URL}
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
