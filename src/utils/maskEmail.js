/**
 * Ẩn bớt email, hiển thị dạng: ban******09@gmail.com
 * @param {string} email
 * @returns {string}
 */
export const maskEmail = (email) => {
  if (!email) return "Chưa cập nhật";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;

  if (localPart.length <= 4) {
    return `${localPart[0]}***@${domain}`;
  }

  return `${localPart.substring(0, 3)}******${localPart.slice(-2)}@${domain}`;
};
