/**
 * Checks if a restaurant is open based on the operating hours and a specific time.
 * @param {Array} operatingHours - An array of operating hours for each day.
 * @param {Date} selectedTime - The time selected by the user.
 * @returns {boolean} - True if the restaurant is open at the selected time, false otherwise.
 */
export const isOpenDuringSelectedTime = (operatingHours, selectedTime) => {
  if (
    !operatingHours ||
    !selectedTime ||
    !(selectedTime instanceof Date) ||
    isNaN(selectedTime.getTime())
  ) {
    console.error("Invalid operating hours or selectedTime", {
      operatingHours,
      selectedTime,
    });
    return false;
  }

  const dayOfWeek = selectedTime.getDay();
  console.log("Using selectedTime:", selectedTime);

  const hoursToday = operatingHours.find((hour) => hour.day === dayOfWeek);

  if (!hoursToday) {
    console.log("No operating hours for day", dayOfWeek);
    return false;
  }

  const selectedMinutes =
    selectedTime.getHours() * 60 + selectedTime.getMinutes();
  const openMinutes =
    parseInt(hoursToday.start.substr(0, 2)) * 60 +
    parseInt(hoursToday.start.substr(2));
  const closeMinutes =
    parseInt(hoursToday.end.substr(0, 2)) * 60 +
    parseInt(hoursToday.end.substr(2));

  return selectedMinutes >= openMinutes && selectedMinutes < closeMinutes;
};
