export const getExpirationStatus = (
  expiry: string | Date | undefined
): string => {
  if (!expiry) {
    return "No expiry date";
  }

  const date = typeof expiry === "string" ? new Date(expiry) : expiry;
  const today = new Date();

  const formattedDate = `Exp. ${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;

  return date < today ? "Expired" : formattedDate;
};
