export type ErrorDetails = {
    statusCode: number,
    message?: string,
};

export class CheckedError extends Error {
    readonly statusCode: number;

    constructor(errorDetails: ErrorDetails) {
        super(JSON.stringify(errorDetails));
        this.statusCode = errorDetails.statusCode;
        this.message = errorDetails.message || '';
    }

}
