export const generateLocaleISODate = (date) => {
  const dateStr = date.toLocaleDateString();
  const parts = dateStr.split("/"); // Split the date string by '/'
  const formattedDate = `${parts[2]}-${parts[0].padStart(
    2,
    "0"
  )}-${parts[1].padStart(2, "0")}`;
  return formattedDate;
};

export const getDayName = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

export const getPreviousDate = (date) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - 1);
  return generateLocaleISODate(previousDate);
};

export const getNextDate = (date) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return generateLocaleISODate(nextDate);
};

export const getDayFormattedDate = (date) => {
  // Format Day, Date Month Year
  return `${getDayName(date)}, ${date.getDate()} ${date.toLocaleString(
    "default",
    {
      month: "long",
    }
  )} ${date.getFullYear()}`;
};
