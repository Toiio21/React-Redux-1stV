export default class BaseError extends Error {
  constructor ({code, message, status}) {
      super()

      this.code = code
      this.message = message
      this.status = status
  }
}