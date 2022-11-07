export type ErrorWithMessage = {
    message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as Record<string, unknown>).message === 'string'
    )
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    let errorWithMessage;

    if (isErrorWithMessage(maybeError)) {
        errorWithMessage = maybeError;
    } else {
        try {
            errorWithMessage = new Error(JSON.stringify(maybeError))
        } catch {
            errorWithMessage = new Error(String(maybeError))
        }
    }

    return errorWithMessage;
}

export function getErrorMessage(error: unknown) {
    return toErrorWithMessage(error).message
}
