import { format, formatISO, formatDistanceToNow } from 'date-fns'

const dateISO = (date: string) => {
  const formattedDate = new Date(date)
  return formatISO(formattedDate)
}

const longMonth = (date: string) => {
  const formattedDate = new Date(date)
  return format(formattedDate, 'dd MMMM, yyyy')
}

const shortMonth = (date: string) => {
  const formattedDate = new Date(date)
  return format(formattedDate, 'dd MMM, yyyy')
}

const dateAgo = (date: string) => {
  const formattedDate = new Date(date)
  return `${formatDistanceToNow(formattedDate)} ago`
}

export {
  dateISO,
  longMonth,
  shortMonth,
  dateAgo
}
