// Converts English digits (0-9) to Persian digits

export function toPersianDigits(value) {
  return value.toString().replace(/\d/g, d =>
    "۰۱۲۳۴۵۶۷۸۹"[d]
  );
}
