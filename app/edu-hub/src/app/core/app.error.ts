import { ErrorCode } from "./constants";

export class AppError extends Error {
    constructor(public code: ErrorCode, message?: string) {
        super(message);
    }
}
