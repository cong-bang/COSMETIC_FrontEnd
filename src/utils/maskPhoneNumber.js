/**
 * Ẩn bớt số điện thoại, hiển thị dạng: *******XXX:
 * @param {string} phoneNumber
 * @returns {string}
 */
export const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "Chưa cập nhật";

  const length = phoneNumber.length;
  if (length <= 3) return phoneNumber;

  const visibleDigits = phoneNumber.slice(-3);
  const masked = "*".repeat(length - 3);

  return `${masked}${visibleDigits}`;
};
