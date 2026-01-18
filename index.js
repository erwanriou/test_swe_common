// FACTORY
const { Listener } = require("./src/factory/listener")
const { Publisher } = require("./src/factory/publisher")
const { Subject, QueueGroupName, FixedValues } = require("./src/factory/types")
const {
  CustomError,
  RequestValidationError,
  DatabaseConnectionError,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError
} = require("./src/factory/errors")

// HELPERS
const { isEmpty } = require("./src/helpers/isEmpty")

// MODELS
const Import = (file, extention) => require(`./src/models/${extention}/${file}`)

// MIDDLEWARES
const { isAuthenticated } = require("./src/middlewares/isAuthenticated")
const { isError } = require("./src/middlewares/isError")

module.exports = {
  // FACTORY
  Listener,
  Publisher,
  Subject,
  QueueGroupName,
  FixedValues,
  CustomError,
  RequestValidationError,
  DatabaseConnectionError,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  // HELPERS
  isEmpty,
  // MIDDLEWARES
  isAuthenticated,
  isError,
  // MODELS
  Import
}
