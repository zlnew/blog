function sanitizeLetter (text: string) {
  return ignoreSpecialChar(text).toLowerCase()
}

const filteredSearchResults = <T>(
  array: T[],
  args: {
    key: keyof T,
    query: string
  }
) => {
  return array.filter((r) => {
    const key = r[args.key] as string
    const target = args.query

    const sanitizedResult = sanitizeLetter(key)
    const sanitizedSearch = sanitizeLetter(target)

    return sanitizedResult.includes(sanitizedSearch)
  })
}

export {
  filteredSearchResults
}
