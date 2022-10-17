export default function isDateValid(givenDateString: string) {
  const givenDateInstance = new Date(givenDateString);
  const givenDate = givenDateInstance.toLocaleDateString();

  const todayInstance = new Date();
  todayInstance.setHours(0, 0, 0, 0);
  const today = todayInstance.toLocaleDateString();

  const dateIsValid = givenDate >= today;
  return dateIsValid;
}
