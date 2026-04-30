import React from "react";

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="flex gap-3 overflow-x-auto pb-3">
      {days.map((date, i) => {
        const isActive =
          selectedDate.toDateString() === date.toDateString();

        return (
          <button
            key={i}
            onClick={() => setSelectedDate(date)}
            className={`min-w-[110px] p-3 rounded-xl border text-sm font-medium transition whitespace-nowrap
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
          >
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </button>
        );
      })}
    </div>
  );
}