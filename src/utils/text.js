export const convertToSentenceCase = (data) => {
  const result = data.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
