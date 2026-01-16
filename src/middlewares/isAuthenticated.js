const { NotAuthorizedError } = require("../factory/errors")

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    throw new NotAuthorizedError()
  }
  next()
}

exports.isAuthenticated = isAuthenticated
