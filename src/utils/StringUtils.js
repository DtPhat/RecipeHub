export const emailToUsername = (email) => {
  return email.match(/^([^@]*)/)[1]
}

export const getFirstNumber = (amount) => {
  const firstNumber = amount.match(/[0-9]+/)
  return firstNumber ? firstNumber[0] : 0
}

export const adjustQuantity = (quantity, customYield, originalYield) => {
  if(!quantity) return ''
  const newQuantity = (quantity * (customYield / originalYield))
  return Number.isInteger(newQuantity) ? newQuantity : newQuantity.toFixed(2)
}