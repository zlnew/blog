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

export {
  ignoreSpecialChar,
  slugify
}
