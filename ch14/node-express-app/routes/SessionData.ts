import session from "express-session";

export interface ISessionData
    extends session.Session {
    username: string;
}