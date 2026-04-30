import React, { useMemo } from "react";

export default function TimeSlots({
  selectedDate,
  selectedSlots,
  onSlotClick,
}) {
  const slots = useMemo(() => {
    const arr = [];
    for (let h = 9; h < 18; h++) {
      arr.push(`${h}:00`);
      arr.push(`${h}:30`);
    }
    return arr;
  }, []);

  const isToday =
    new Date().toDateString() === selectedDate.toDateString();

  const isPast = (time) => {
    if (!isToday) return false;

    const now = new Date();
    const slot = new Date(selectedDate);
    const [h, m] = time.split(":");
    slot.setHours(h, m);

    return slot < now;
  };

  const isSelected = (time) =>
    selectedSlots.find(
      (s) =>
        s.date === selectedDate.toDateString() && s.time === time
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-5">
      {slots.map((time) => {
        const disabled = isPast(time);
        const selected = isSelected(time);

        return (
          <button
            key={time}
            disabled={disabled}
            onClick={() =>
              onSlotClick({
                date: selectedDate.toDateString(),
                time,
              })
            }
            className={`w-full py-3 rounded-xl border text-sm font-medium transition
              ${
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : selected
                  ? "bg-green-500 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}