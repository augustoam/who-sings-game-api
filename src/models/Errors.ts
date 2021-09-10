import { ErrorMapType } from '../types';

export const enum Errors {
    UNAUTHORIZED = "UNAUTHORIZED",
    EXPIRED_TOKEN = "EXPIRED_TOKEN",
    INVALID_TOKEN = "INVALID_TOKEN",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    FORBIDDEN = "FORBIDDEN",
    BAD_REQUEST = "BAD_REQUEST",
    GENERIC_ERROR = "GENERIC_ERROR",
    ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",
    NOT_FOUND = "NOT_FOUND",
    ALREADY_CREATED = "ALREADY_CREATED"
}

export const ErrorMap: ErrorMapType = {
    UNAUTHORIZED: {
        label: "Unauthorized",
        code: "unauthorized",
        status: 401
    },

    EXPIRED_TOKEN: {
        label: "Expired token",
        code: "unauthorized-expired-token",
        status: 401
    },

    INVALID_TOKEN: {
        label: "Invalid token",
        code: "unauthorized-invalid-token",
        status: 401
    },

    INVALID_CREDENTIALS: {
        label: "Invalid credentials",
        code: "invalid-credentials",
        status: 403
    },

    FORBIDDEN: {
        label: "Forbidden",
        code: "forbidden",
        status: 403
    },

    BAD_REQUEST: {
        label: "Bad request",
        code: "bad-request",
        status: 400
    },

    GENERIC_ERROR: {
        label: "Internal server error",
        code: "generic-service-error",
        status: 500
    },

    ENTITY_NOT_FOUND: {
        label: "Entity not found",
        code: "entity-not-found",
        status: 400
    },

    NOT_FOUND: {
        label: "Not found",
        code: "not-found",
        status: 404
    },

    ALREADY_CREATED: {
        label: "Already created",
        code: "already-created",
        status: 409
    },
};

export const mapErrorCode = (error): Errors => {
    if (error.response?.body?.status === 'error') {
        switch (error.response?.body?.error?.code) {
            case 'unauthorized': {
                return Errors.UNAUTHORIZED;
            }
            case 'unauthorized-expired-token': {
                return Errors.EXPIRED_TOKEN;
            }
            case 'unauthorized-invalid-token': {
                return Errors.INVALID_TOKEN;
            }
            case 'invalid-credentials': {
                return Errors.INVALID_CREDENTIALS;
            }
            case 'forbidden': {
                return Errors.FORBIDDEN;
            }
            case 'bad-request': {
                return Errors.BAD_REQUEST;
            }
            case 'generic-service-error': {
                return Errors.GENERIC_ERROR;
            }
            case 'entity-not-found': {
                return Errors.ENTITY_NOT_FOUND;
            }
            case 'not-found': {
                return Errors.NOT_FOUND;
            }
            case 'already-created': {
                return Errors.ALREADY_CREATED;
            }
            default: {
                return Errors.BAD_REQUEST;
            }
        }
    } else {
        return Errors.BAD_REQUEST;
    }
};
