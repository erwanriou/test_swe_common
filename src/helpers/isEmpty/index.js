const isObject = value => typeof value === "object" && Object.keys(value).length === 0
const isString = value => typeof value === "string" && value.trim().length === 0
const isEmpty = value => {
  const isDate = value instanceof Date
  return value === undefined || value === null || (isObject(value) && !isDate) || isString(value)
}

exports.isEmpty = isEmpty
