export default function isDateValid(givenDateString: string) {
  const givenDateInstance = new Date(givenDateString);
  const givenDate = givenDateInstance.toLocaleDateString();

  const todayInstance = new Date();
  todayInstance.setHours(0, 0, 0, 0);
  const today = todayInstance.toLocaleDateString();

  const dateIsValid = givenDate >= today;
  return dateIsValid;
}

export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  const formattedDate = [month, day, year].join("-");
  return formattedDate;
}

export function formatPollDate(dateString: string) {
  const dateInstance = new Date(dateString);
  const date = dateInstance.toDateString();
  return date;
}
