export function isValidEmail(email) {
  return /^\w+@\w+\.\w+$/.test(email);
}
