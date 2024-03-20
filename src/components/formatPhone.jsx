// Function to format the phone number
export const formatPhone = (text) => {
  // Remove all non-digit characters
  const cleaned = ("" + text).replace(/\D/g, "");

  // Check the length and set the formatting accordingly
  const match = cleaned.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/);

  if (match) {
    // Format the numbers
    let formatted = "(" + match[1];
    if (match[2]) {
      formatted += ") " + match[2];
    }
    if (match[3]) {
      formatted += "-" + match[3];
    }
    return formatted;
  }

  return text;
};
