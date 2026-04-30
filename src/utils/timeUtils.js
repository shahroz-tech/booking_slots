export const generateTimeSlots = () => {
  const slots = [];
  for (let h = 9; h < 18; h++) {
    slots.push(`${h}:00`);
    slots.push(`${h}:30`);
  }
  return slots;
};

export const isPastTime = (selectedDate, time) => {
  const now = new Date();
  const slot = new Date(selectedDate);

  const [h, m] = time.split(":");
  slot.setHours(h, m);

  return slot < now;
};