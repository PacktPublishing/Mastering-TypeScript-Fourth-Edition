import express from "express";
import { ISessionData } from "./SessionData";

let router = express.Router();

router.get(`/`,
    (
        req: express.Request,
        res: express.Response
    ) => {
        res.render('index',
            {
                title: 'Express App',
                welcomeMsg: 'Welcome to the Express App',
                username: (<ISessionData>req.session).username
            }
        )
    });

export { router };