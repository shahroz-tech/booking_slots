import React from "react";

export default function SummaryPanel({ selectedSlots, removeSlot }) {
  return (
    <div className="w-full bg-white shadow-lg rounded-2xl p-4 sm:p-5 lg:sticky lg:top-6 h-full">
      <h2 className="text-lg font-bold mb-4">
        Selected Slots ({selectedSlots.length})
      </h2>

      {selectedSlots.length === 0 && (
        <p className="text-gray-500 text-sm">No slots selected</p>
      )}

      <div className="max-h-[400px] overflow-y-auto">
        {selectedSlots.map((slot, i) => (
          <div
            key={i}
            className="flex justify-between items-center mb-3 p-3 rounded-lg bg-gray-50"
          >
            <div>
              <p className="text-sm font-medium">{slot.date}</p>
              <p className="text-xs text-gray-500">{slot.time}</p>
            </div>

            <button
              onClick={() => removeSlot(slot)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}