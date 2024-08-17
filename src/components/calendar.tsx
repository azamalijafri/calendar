import React, { useState } from "react";
import dayjs from "dayjs";
import { useModal } from "@/stores/modal-store";
import { Button } from "./ui/button";
import { useEvent } from "@/stores/event-store";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const { events } = useEvent();
  const { openModal } = useModal();

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDayOfWeek = startOfMonth.day();

  const startOfPrevMonth = startOfMonth.subtract(1, "month");
  const startDayOfPrevMonth =
    startOfPrevMonth.endOf("month").date() - startDayOfWeek + 1;

  const prevMonthDays = Array.from({ length: startDayOfWeek }, (_, i) =>
    startOfPrevMonth.date(startDayOfPrevMonth + i).startOf("day")
  );

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.date(i + 1).startOf("day")
  );

  const nextMonthDaysCount = Math.max(
    0,
    35 - (prevMonthDays.length + daysInMonth)
  );
  const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) =>
    startOfMonth
      .add(1, "month")
      .date(i + 1)
      .startOf("day")
  );

  const days = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const today = dayjs().startOf("day");

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePreviousMonth}>Previous</Button>
        <h2 className="text-xl font-bold underline underline-offset-4">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <Button onClick={handleNextMonth}>Next</Button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center rounded-lg">
        {weekDays.map((weekday) => (
          <div
            key={weekday}
            className="font-semibold p-2 border-b border-gray-300 bg-gray-100"
          >
            {weekday}
          </div>
        ))}
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((date, dayIndex) => {
              const isToday = date.isSame(today, "day");
              const eventsForDay = events.filter((event) =>
                dayjs(event.date).isSame(date, "day")
              );
              return (
                <div
                  key={dayIndex}
                  className={`p-2 md:p-3 lg:p-4 relative border flex flex-col gap-y-4 border-gray-300 rounded-lg transition-colors duration-150 ease-in-out cursor-pointer hover:bg-blue-100 ${
                    date.month() !== currentMonth.month()
                      ? "text-gray-400"
                      : isToday
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white"
                  }`}
                  onClick={() => openModal("day-details", { date })}
                >
                  <div
                    className={`mx-auto flex items-center justify-center size-6 md:size-7 lg:size-8 rounded-full ${
                      eventsForDay.length > 0 &&
                      (isToday
                        ? "bg-white text-primary"
                        : "bg-primary text-white")
                    }`}
                  >
                    {date.date() !== 0 && (
                      <span className={`font-medium text-sm lg:text-base`}>
                        {date.date()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
