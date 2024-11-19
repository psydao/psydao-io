export const getExpirationStatus = (
  expiry: string
): string => {
  if (!expiry) {
    return "No expiry date";
  }

  const date = new Date(Number(expiry) * 1000);
  const today = new Date();

  const formattedDate = `Exp. ${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  return date < today ? "Expired" : formattedDate;
};