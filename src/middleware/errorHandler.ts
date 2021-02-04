export class ErrorHandler extends Error {
    public message: string
    public status: number
    public constructor(message: string, status = 404) {
        super(message)
        this.message = message
        this.status = status
    }
}

export function errorMiddleware(error: ErrorHandler) {
    const message = error.message || 'Something went wrong'
    const status = error.status
    return { status, message }
}
