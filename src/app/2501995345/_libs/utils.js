const valueOrDefault = (value, defaultValue) => {
  return value || defaultValue;
};

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export { valueOrDefault, truncateText };
