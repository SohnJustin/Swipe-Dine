export const formatPhone = (text) => {
  // Remove all non-digit characters
  const cleaned = ("" + text).replace(/\D/g, "");

  // Assuming all numbers are US numbers, add the country code +1
  // Check if the number starts with 1, which is the US country code
  if (cleaned.startsWith("1")) {
    return "+" + cleaned;
  } else {
    return "+1" + cleaned;
  }
};
