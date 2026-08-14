export function pickLocale(value, locale) {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    (Object.prototype.hasOwnProperty.call(value, 'en') ||
      Object.prototype.hasOwnProperty.call(value, 'ko'))
  ) {
    return value[locale] ?? value.en ?? ''
  }
  return value
}

export function getByPath(source, path) {
  return path.split('.').reduce((current, key) => {
    if (current == null) return undefined
    return current[key]
  }, source)
}

export function interpolate(template, vars) {
  if (!vars) return template
  return String(template).replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] == null ? `{${key}}` : String(vars[key]),
  )
}
