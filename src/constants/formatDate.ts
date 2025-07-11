export const formatDate = (dateString: string | Date): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};