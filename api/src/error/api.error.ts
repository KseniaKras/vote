import { HttpStatusCode } from 'constants/http'

class ApiError extends Error {
  status: HttpStatusCode

  constructor(status: HttpStatusCode, message: string) {
    super(message)
    this.status = status

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = this.constructor.name
  }

  static badRequest(message: string) {
    return new ApiError(HttpStatusCode.BAD_REQUEST, message)
  }

  static notFound(message: string) {
    return new ApiError(HttpStatusCode.NOT_FOUND, message)
  }

  static conflict(message: string) {
    return new ApiError(HttpStatusCode.CONFLICT, message)
  }

  static internal(message: string) {
    return new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, message)
  }
}

export default ApiError
