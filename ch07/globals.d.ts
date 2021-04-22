declare const CONTACT_EMAIL_ARRAY: string[];

interface IResponse {
    responseText: IFailureMessage;
}

interface IFailureMessage {
    failure: boolean | string;
    errorMessage?: string;
}

declare module ErrorHelper {
    function containsErrors(response: IResponse): boolean;
    function trace(message: IResponse | string): void;
}

