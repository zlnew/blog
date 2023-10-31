function setValidationErrors (errors: Record<string, string[]>) {
  return Object.keys(errors).map(key => ({
    path: key,
    message: errors[key][0]
  }))
}

export {
  setValidationErrors
}
