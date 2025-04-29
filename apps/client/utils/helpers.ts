export const formatDate = (date: Date): string => {
  const today = new Date();

  // Check if the date is the same as today's date
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    // Return time in hh:mm AM/PM format
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  } else {
    // Return date in dd/mm/yy format
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }
}
