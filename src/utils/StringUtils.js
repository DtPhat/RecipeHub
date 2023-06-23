export const emailToUsername = (email) => {
  return email.match(/^([^@]*)/)[1]
}
