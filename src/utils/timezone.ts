const offsetToTimezone: any = {
  "UTC+00:00": "Africa/Abidjan",
  "UTC+01:00": "Etc/GMT-1",
  "UTC+02:00": "Etc/GMT-2",
  "UTC+03:00": "Etc/GMT-3",
  "UTC+04:00": "Etc/GMT-4",
  "UTC+05:00": "Etc/GMT-5",
  "UTC+06:00": "Etc/GMT-6",
  "UTC+07:00": "Etc/GMT-7",
  "UTC+08:00": "Etc/GMT-8",
  "UTC+09:00": "Etc/GMT-9",
  "UTC+10:00": "Etc/GMT-10",
  "UTC+11:00": "Etc/GMT-11",
  "UTC+12:00": "Etc/GMT-12",
  "UTC+13:00": "Etc/GMT-13",
  "UTC+14:00": "Etc/GMT-14",
  "UTC-01:00": "Etc/GMT+1",
  "UTC-02:00": "Etc/GMT+2",
  "UTC-03:00": "Etc/GMT+3",
  "UTC-04:00": "Etc/GMT+4",
  "UTC-05:00": "Etc/GMT+5",
  "UTC-06:00": "Etc/GMT+6",
  "UTC-07:00": "Etc/GMT+7",
  "UTC-08:00": "Etc/GMT+8",
  "UTC-09:00": "Etc/GMT+9",
  "UTC-10:00": "Etc/GMT+10",
  "UTC-11:00": "Etc/GMT+11",
  "UTC-12:00": "Etc/GMT+12",
  "UTC-09:30": "Pacific/Marquesas",
  "UTC+04:30": "Asia/Kabul",
  "UTC+05:30": "Asia/Calcutta",
  "UTC+09:30": "Australia/Adelaide",
};

const getTimeStamp = ({
  date,
  month,
  year,
  hours,
  minutes,
  UTC,
}: {
  date: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  UTC: string;
}) => {
  const dateObj = new Date(Date.UTC(year, month, date, 0, 0, 0));
  let offsetHours = Number(UTC.substr(4, 2));
  let offsetMinutes = Number(UTC.substr(7, 2));
  if (UTC.substr(3, 1) === "-") {
    dateObj.setMinutes(dateObj.getMinutes() + (offsetHours * 60 + offsetMinutes));
    dateObj.setMinutes(dateObj.getMinutes() + hours * 60 + minutes);
    dateObj.setDate(dateObj.getDate());
  } else {
    dateObj.setMinutes(dateObj.getMinutes() - (offsetHours * 60 + offsetMinutes));
    dateObj.setMinutes(dateObj.getMinutes() + hours * 60 + minutes);
  }
  return dateObj.getTime();
};

function decryptTimestamp(timeStamp: number, UTC: string, timeFormat: string) {
  const d = new Date(timeStamp);
  let formattedDateStr = new Intl.DateTimeFormat(timeFormat === "12" ? "en-us" : "en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: offsetToTimezone[UTC],
  }).format(d);
  let [dateStr, timeStr] = formattedDateStr.split(",");
  timeStr = timeStr.trim();
  let date, month, year, hours, minutes, rest, AMPM;
  // DATE GRAB
  if (timeFormat === "12") {
    [month, date, year] = dateStr.split("/");
    if (Number(month) < 10) {
      month = "0" + month;
    }
  } else {
    [date, month, year] = dateStr.split("/");
  }
  // TIME GRAB
  if (timeFormat === "12") {
    [hours, rest] = timeStr.split(":");
    [minutes, AMPM] = rest.split(" ");
  } else {
    [hours, minutes] = timeStr.split(":");
  }
  if (timeFormat === "12") return { date, month, year, hours, minutes, AMPM };
  else return { date, month, year, hours, minutes };
}

export { decryptTimestamp, getTimeStamp };
