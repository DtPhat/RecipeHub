
export const getNumberOfDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
export const sortDays = (date) => {
  const dayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const sortedDays = [...DAYS.slice(dayIndex), ...DAYS.slice(0, dayIndex)]
  return sortedDays
}
export const areSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()

  export const getDayMonthYear = (date) => {
    const d = date.toDateString().split(" ")
    return `${d[2]} ${d[1]} ${d[3]}`
  }

export const getMonthYear = (date) => {
  const d = date.toDateString().split(" ")
  return `${d[1]} ${d[3]}`
}

export const getDateMonth = (date) => {
  const d = date.toDateString().split(" ")
  return `${d[2]} ${d[1]}`
}


export const moveNextMonth = (date, cb) => {
  const mon = date.getMonth()
  if (mon < 11) {
    date.setMonth(mon + 1)
  } else {
    date.setMonth(0)
    date.setFullYear(date.getFullYear() + 1)
  }
  cb(new Date(date))
}
export const movePrevMonth = (date, cb) => {
  const mon = date.getMonth()
  if (mon > 0) {
    date.setMonth(mon - 1)
  } else {
    date.setMonth(11)
    date.setFullYear(date.getFullYear() - 1)
  }
  cb(new Date(date))
}

export const moveNextWeek = (date, cb) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + 7)
  console.log(newDate);
  cb(new Date(newDate))
}

export const movePrevWeek = (date, cb) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() - 7)
  cb(new Date(newDate))
}
// export const getDarkColor = () => {
//   var color = "#"
//   for (var i = 0 i < 6 i++) {
//     color += Math.floor(Math.random() * 10)
//   }
//   return color


export const getDaysInMonth = (date) => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
  const numberOfDaysInMonth = getNumberOfDaysInMonth(date)
  const { result } = Array.from({ length: numberOfDaysInMonth }).reduce(
    ({ result, dateInMonth }) => ({
      result: [...result, new Date(dateInMonth)],
      dateInMonth: new Date(dateInMonth.setDate(dateInMonth.getDate() + 1)),
    }),
    { result: [], dateInMonth: new Date(startDate) }
  )
  return result
}
export const getFilledDaysInMonth = (date) => {
  const daysInMonth = getDaysInMonth(date)
  const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const fillingStart = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const total = fillingStart + getNumberOfDaysInMonth(date)
  const fillingEnd = total > 35 ? 42 - total : total > 28 ? 35 - total : 28 - total
  return [...Array(fillingStart), ...daysInMonth, ...Array(fillingEnd)]
}

export const getDaysInWeek = (date) => {
  const dayOfWeek = new Date(date).getDay()
  const dayPassed = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const startDate = new Date(date)
  startDate.setDate(startDate.getDate() - dayPassed)
  const { result } = Array.from({ length: 7 }).reduce(
    ({ result, dateInWeek }) => ({
      result: [...result, new Date(dateInWeek)],
      dateInWeek: new Date(dateInWeek.setDate(dateInWeek.getDate() + 1)),
    }),
    { result: [], dateInWeek: new Date(startDate) }
  )
  return result
}
