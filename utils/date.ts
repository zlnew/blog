import { format, formatDistanceToNow } from 'date-fns'

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
  longMonth,
  shortMonth,
  dateAgo
}
