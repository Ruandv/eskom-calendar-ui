import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import styles from "./loadshedding-calendar.module.css";
import { Themes } from "../../enums/enums";
export interface ILoadsheddingCalendar {
  eventData?: any[];
  theme: Themes;
  eventCalendarName?: string;
}

function LoadsheddingCalendar({
  theme,
  eventData,
  eventCalendarName,
}: ILoadsheddingCalendar) {
  var eventDataItem: any = eventData;
  if (eventCalendarName) {
    eventDataItem = {
      //Proxy URL to overcome CORS.
      url: `${process.env.REACT_APP_CALENDAR_BASE_URL}Get?calendarName=${eventCalendarName}`,
      format: "ics",
    };
  }

  return (
    <div className={`${styles.fullCalendarContainer} ${styles[theme]}`}>
      <FullCalendar
        themeSystem="bootstrap5"
        plugins={[timeGridPlugin, iCalendarPlugin]}
        initialView="timeGridWeek"
        weekends={true}
        events={eventDataItem}
      />
    </div>
  );
}

export default LoadsheddingCalendar;
