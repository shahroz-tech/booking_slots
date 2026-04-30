import React, { useState, useEffect } from "react";
import DateSelector from "./components/DateSelector";
import TimeSlots from "./components/TimeSlots";
import SummaryPanel from "./components/SummaryPanel";

const MAX_SELECTION = 3;

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ FIXED localStorage (no overwrite issue)
  const [selectedSlots, setSelectedSlots] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("slots")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("slots", JSON.stringify(selectedSlots));
  }, [selectedSlots]);

  const handleSlotClick = (slot) => {
    const exists = selectedSlots.find(
      (s) => s.date === slot.date && s.time === slot.time
    );

    // Toggle remove
    if (exists) {
      setSelectedSlots((prev) =>
        prev.filter(
          (s) => !(s.date === slot.date && s.time === slot.time)
        )
      );
      return;
    }

    // Max 3
    if (selectedSlots.length >= MAX_SELECTION) {
      alert("You can select maximum 3 slots");
      return;
    }

    // Same hour restriction
    const hour = slot.time.split(":")[0];
    const sameHour = selectedSlots.find(
      (s) => s.date === slot.date && s.time.startsWith(hour)
    );
    if (sameHour) {
      alert("You cannot select two slots from same hour");
      return;
    }

    setSelectedSlots((prev) => [...prev, slot]);
  };

  const removeSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.filter(
        (s) => !(s.date === slot.date && s.time === slot.time)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-5 sm:px-6 md:px-10 overflow-x-hidden">

      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        Booking Slot Selector
      </h1>

      {/* Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-strech">
        {/* Left Section */}
        <div className="flex-1 w-full bg-white p-3 sm:p-5 rounded-2xl shadow overflow-hidden">

          {/* Inner wrapper for proper spacing + responsiveness */}
          <div className="flex flex-col gap-5 w-full">

            {/* Date Selector wrapper */}
            <div className="w-full overflow-x-auto pb-2">
              <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>

            {/* Time slots wrapper */}
            <div className="w-full">
              <TimeSlots
                selectedDate={selectedDate}
                selectedSlots={selectedSlots}
                onSlotClick={handleSlotClick}
              />
            </div>

          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-96">
          <SummaryPanel
            selectedSlots={selectedSlots}
            removeSlot={removeSlot}
          />
        </div>
      </div>
    </div>
  );
}