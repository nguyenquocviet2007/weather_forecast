const StatusCode = {
    FORBIDEN: 403,
    CONFLICT: 409,
}

const ReasonStatusCode = {
    FORBIDEN: 'Bad Request Error',
    CONFLICT: 'Conflict Error',
}

import { StatusCodes, ReasonPhrases } from '../utils/httpStatusCode'

class ErrorResponse extends Error {
    public status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}
class BadRequestRequestError extends ErrorResponse {

    constructor(message = ReasonStatusCode.FORBIDEN, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED){
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND){
        super(message, statusCode)
    }
}

class ForbidentError extends ErrorResponse {

    constructor(message = ReasonStatusCode.FORBIDEN, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode)
    }
}

export {
    ConflictRequestError,
    BadRequestRequestError,
    NotFoundError,
    AuthFailureError,
    ForbidentError
}