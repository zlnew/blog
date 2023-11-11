function ignoreSpecialChar (text: string) {
  return text.replace(/[^a-zA-Z0-9]/g, '')
}

function slugify (str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function capitalize (str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export {
  ignoreSpecialChar,
  slugify,
  capitalize
}
