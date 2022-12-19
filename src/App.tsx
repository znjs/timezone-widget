import { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";
import { decryptTimestamp, getTimeStamp } from "./utils";

const TIMEZONES = [
  "UTC-01:00",
  "UTC-02:00",
  "UTC-03:00",
  "UTC-04:00",
  "UTC-05:00",
  "UTC-06:00",
  "UTC-07:00",
  "UTC-08:00",
  "UTC-09:00",
  "UTC-10:00",
  "UTC-11:00",
  "UTC-12:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
  "UTC+13:00",
  "UTC+14:00",
  "UTC-09:30",
  "UTC+04:30",
  "UTC+05:30",
  "UTC+09:30",
];

function App() {
  const [timestamp, setTimestamp] = useState(0);
  const [computedTimestamp, setComputedTimestamp] = useState(0);
  const [timezone, setTimezone] = useState(localStorage.getItem("timezone") || "UTC+00:00");
  const [dateTime, setDateTime] = useState("");
  const [time, setTime] = useState<null | {
    date: string;
    month: string;
    year: string;
    hours: string;
    minutes: string;
  }>(null);

  const timeStampCalc = () => {
    let hours, minutes, date, month, year;
    let [dateStr, timeStr] = dateTime.split("T");
    [hours, minutes] = timeStr.split(":");
    [year, month, date] = dateStr.split("-");
    setComputedTimestamp(
      getTimeStamp({
        date: Number(date),
        month: Number(month) - 1,
        year: Number(year),
        hours: Number(hours),
        minutes: Number(minutes),
        UTC: timezone,
      }),
    );
  };
  const getMonth = (month: string) => {
    switch (month) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "Aug";
      case "09":
        return "Sept";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
    }
    return month;
  };

  return (
    <div className="bg-slate-200 p-4 text-center sm:text-left h-screen">
      <nav className="flex flex-wrap items-center justify-between max-w-[875px] mx-auto">
        <h1 className="text-2xl sm:text-3xl  mb-4 flex items-center">
          <AiFillClockCircle />
          &nbsp; Time-Timezone Calculator
        </h1>
        <div className="flex items-center">
          <label htmlFor="timezone">Timezone</label>
          <select
            name="timezone"
            id="timezone"
            className="px-2 py-1 rounded-lg mx-2 outline-none border-2 border-gray-500"
            value={timezone}
            onChange={(e) => {
              localStorage.setItem("timezone", e.target.value);
              setTimezone(e.target.value);
            }}>
            {TIMEZONES.map((timezone) => (
              <option key={nanoid()} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <div className="flex flex-wrap items-center justify-between max-w-[875px] mx-auto mt-16">
        <div>
          <p className="font-semibold text-lg ">Timestamp to Time convertor</p>
          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="timestamp" className="pr-2">
                Timestamp
              </label>
              <input
                type="number"
                id="timestamp"
                name="timestamp"
                className="rounded-lg px-2 py-1 outline-none border-2 border-gray-500"
                value={timestamp}
                onChange={(e) => {
                  setTimestamp(Number(e.target.value));
                }}
              />
            </div>
            <button
              className="bg-blue-400 rounded-lg px-2 py-1 my-2 mx-2"
              onClick={() => {
                setTime(() => decryptTimestamp(timestamp, timezone, "24"));
              }}>
              Compute time
            </button>
            <div className="min-h-[50px]">
              {time && (
                <>
                  <h1>
                    Date: {time.date} {getMonth(time.month)} {time.year}
                  </h1>
                  <h1>
                    Time: {time.hours}:{time.minutes}
                  </h1>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="self-start">
          <p className="font-semibold text-lg ">Time to Timestamp convertor</p>
          <div>
            <div>
              <label htmlFor="timeAndDate" className="pr-2">
                Date and Time
              </label>
              <input
                className="rounded-lg px-2 py-1 outline-none border-2 border-gray-500"
                type="datetime-local"
                id="timeAndDate"
                name="timeAndDate"
                value={dateTime}
                onChange={(e) => {
                  setDateTime(e.target.value);
                }}
              />
            </div>
            <button
              className="bg-blue-400 rounded-lg px-2 py-1 my-2 mx-2"
              onClick={() => {
                if (dateTime.length) timeStampCalc();
                else
                  toast.error("Select a date and time", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
              }}>
              Compute timestamp
            </button>
            {Boolean(computedTimestamp) && <p>Timestamp: {computedTimestamp}</p>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
