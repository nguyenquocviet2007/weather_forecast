"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbidentError = exports.AuthFailureError = exports.NotFoundError = exports.BadRequestRequestError = exports.ConflictRequestError = void 0;
const StatusCode = {
    FORBIDEN: 403,
    CONFLICT: 409,
};
const ReasonStatusCode = {
    FORBIDEN: 'Bad Request Error',
    CONFLICT: 'Conflict Error',
};
const httpStatusCode_1 = require("../utils/httpStatusCode");
class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode);
    }
}
exports.ConflictRequestError = ConflictRequestError;
class BadRequestRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDEN, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode);
    }
}
exports.BadRequestRequestError = BadRequestRequestError;
class AuthFailureError extends ErrorResponse {
    constructor(message = httpStatusCode_1.ReasonPhrases.UNAUTHORIZED, statusCode = httpStatusCode_1.StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}
exports.AuthFailureError = AuthFailureError;
class NotFoundError extends ErrorResponse {
    constructor(message = httpStatusCode_1.ReasonPhrases.NOT_FOUND, statusCode = httpStatusCode_1.StatusCodes.NOT_FOUND) {
        super(message, statusCode);
    }
}
exports.NotFoundError = NotFoundError;
class ForbidentError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDEN, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode);
    }
}
exports.ForbidentError = ForbidentError;
