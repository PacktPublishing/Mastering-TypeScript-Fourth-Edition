import express from "express";

let app = express();

import * as Index from "./routes/index";
import * as Login from "./routes/login";

import * as path from "path";
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


import expressSession from 'express-session';

app.use(expressSession(
    {
        secret: `asdfghjkl`,
        resave: false,
        saveUninitialized: true
    }
));

app.use(`/`, Index.router);
app.use(`/`, Login.router);

app.use(express.static(path.join(__dirname, 'resources')));


import config from "config";

enum ConfigOptions {
    PORT = 'port'
}

let port = 3000;

if (config.has(ConfigOptions.PORT)) {
    port = config.get(ConfigOptions.PORT)
} else {
    console.log(`no port config found, using default ${port}`);
}

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});