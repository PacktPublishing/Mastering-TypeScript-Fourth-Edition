import express from "express";

const app = express();

app.get("/",
    (
        req: express.Request,
        res: express.Response
    ) => {
        console.log(`request URL : ${req.url}`);
        res.send(`Hello Express !`);
    });

app.listen(3000, () => {
    console.log(`listening on port 3000`);
});
