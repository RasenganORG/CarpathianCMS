export function formatDate(dateString) {
  const date = new Date(dateString);

  const dd = String(date.getDate()).padStart(2, '0'); // get day and pad with 0 if needed
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // get month (0-11), add 1 and pad with 0 if needed
  const yyyy = date.getFullYear(); // get full year

  return `${dd}.${mm}.${yyyy}`; // return formatted string
}