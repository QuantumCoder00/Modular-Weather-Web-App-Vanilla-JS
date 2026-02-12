// Converts Persian digits (۰-۹) back to English digits (0-9)

function toEnglishDigits(value) {
  if (value === null || value === undefined) return value;

  const persianNums = "۰۱۲۳۴۵۶۷۸۹";
  const englishNums = "0123456789";

  return value
    .toString()
    .replace(/[۰-۹]/g, (d) =>
      englishNums[persianNums.indexOf(d)]
    );
}

export { toEnglishDigits };