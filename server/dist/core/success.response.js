"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = exports.CREATED = exports.OK = void 0;
const StatusCode = {
    OK: 200,
    CREATED: 201,
};
const ReasonStatusCode = {
    OK: 'Success',
    CREATED: 'Created',
};
class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}, }) {
        this.message = message !== null && message !== void 0 ? message : reasonStatusCode;
        this.status = statusCode;
        this.metadata = metadata;
    }
    send(res, headers = {}) {
        Object.entries(headers).forEach(([key, value]) => {
            res.setHeader(key, value);
        });
        return res.status(this.status).json(this);
    }
}
exports.SuccessResponse = SuccessResponse;
class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}
exports.OK = OK;
class CREATED extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata, options, }) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options;
    }
}
exports.CREATED = CREATED;
