// Transforms string to title case
// e.g. available to buy => Available To Buy
export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
};

export const getDelayTime = (str) => {
  return 700 * str.length;
};

// Regex for validating IPV4 addresses
// added first if to handle 0.0.0.0
export const validateIPaddress = (ipaddress) => {
  if (ipaddress === "0.0.0.0") {
    return true;
  } else if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return false;
  }
  return true;
};
