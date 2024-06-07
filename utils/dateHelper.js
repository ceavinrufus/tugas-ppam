export const generateLocaleISODate = (date) => {
  const dateStr = date.toLocaleDateString();
  const parts = dateStr.split("/"); // Split the date string by '/'
  const formattedDate = `${parts[2]}-${parts[0].padStart(
    2,
    "0"
  )}-${parts[1].padStart(2, "0")}`;
  return formattedDate;
};
