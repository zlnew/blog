import { format, formatISO, formatDistanceToNow } from 'date-fns'

const dateISO = (date?: string | null) => {
  const formattedDate = new Date(date || new Date().toString())
  return formatISO(formattedDate)
}

const longMonth = (date?: string | null) => {
  const formattedDate = new Date(date || new Date().toString())
  return format(formattedDate, 'dd MMMM, yyyy')
}

const shortMonth = (date?: string | null) => {
  const formattedDate = new Date(date || new Date().toString())
  return format(formattedDate, 'dd MMM, yyyy')
}

const dateAgo = (date?: string | null) => {
  const formattedDate = new Date(date || new Date().toString())
  return `${formatDistanceToNow(formattedDate)} ago`
}

export {
  dateISO,
  longMonth,
  shortMonth,
  dateAgo
}
