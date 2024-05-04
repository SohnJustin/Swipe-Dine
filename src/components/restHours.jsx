/**
 * Checks if a restaurant is open based on the operating hours and a specific time.
 * @param {Array} operatingHours - An array of operating hours for each day.
 * @param {Date} selectedTime - The time and date selected by the user.
 * @returns {boolean} - True if the restaurant is open at the selected time, false otherwise.
 */
const isOpenDuringSelectedTime = (operatingHours, selectedTime) => {
  if (!operatingHours) {
    console.error("Operating hours data is missing");
    return false;
  }

  // Debug: Log operating hours to check their structure
  console.log("Operating Hours:", operatingHours);

  const dayOfWeek = selectedTime.getDay();
  const hoursToday = operatingHours.find((hour) => hour.day === dayOfWeek);

  if (!hoursToday) {
    console.log(`No operating hours for day ${dayOfWeek}`);
    return false;
  }

  // Debug: Log found hours for the day
  console.log(`Hours today for day ${dayOfWeek}:`, hoursToday);

  const selectedMinutes =
    selectedTime.getHours() * 60 + selectedTime.getMinutes();
  const openMinutes =
    parseInt(hoursToday.start.substr(0, 2)) * 60 +
    parseInt(hoursToday.start.substr(2));
  const closeMinutes =
    parseInt(hoursToday.end.substr(0, 2)) * 60 +
    parseInt(hoursToday.end.substr(2));

  // Debug: Log the time comparison details
  console.log(
    `Selected Time in minutes: ${selectedMinutes}, Open Time: ${openMinutes}, Close Time: ${closeMinutes}`
  );

  const isOpen =
    selectedMinutes >= openMinutes && selectedMinutes < closeMinutes;
  console.log(`Is open: ${isOpen}`);
  return isOpen;
};

export { isOpenDuringSelectedTime };
