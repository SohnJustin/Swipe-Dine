/**
 * Checks if a restaurant is open during the selected time.
 * @param {Object[]} operatingHours - An array of operating hours for each day.
 * @param {Date} selectedTime - The time selected by the user.
 * @returns {boolean} - True if the restaurant is open at the selected time, false otherwise.
 */
// Updated function to check if a restaurant is open during the selected time
export function isOpenDuringSelectedTime(operatingHours, selectedTime) {
  console.log(
    "Operating hours:",
    operatingHours,
    "Selected Time:",
    selectedTime
  );
  if (!operatingHours) return false; // Immediately return false if operatingHours is undefined

  const dayOfWeek = selectedTime.getDay(); // Get day index (0 = Sunday, 1 = Monday, ...)
  const hoursToday = operatingHours[dayOfWeek]; // Get operating hours for today

  if (!hoursToday) return false; // Closed today or data missing

  // Convert selectedTime to minutes from start of the day
  const minutesFromMidnight =
    selectedTime.getHours() * 60 + selectedTime.getMinutes();

  // Assuming hoursToday is something like { open: "11:00", close: "22:00" }
  const openingTime =
    parseInt(hoursToday.open.split(":")[0]) * 60 +
    parseInt(hoursToday.open.split(":")[1]);
  const closingTime =
    parseInt(hoursToday.close.split(":")[0]) * 60 +
    parseInt(hoursToday.close.split(":")[1]);

  // Check if current time is within operating hours
  return (
    minutesFromMidnight >= openingTime && minutesFromMidnight <= closingTime
  );
}
