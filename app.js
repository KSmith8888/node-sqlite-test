import express from "express";

import { notesRouter } from "./notes-route.js";

const app = express();

app.use((req, res, next) => {
    try {
        if (!req.headers.origin) {
            res.status(400);
            res.json({ message: "Not authorized to access this resource" });
        } else {
            res.header(
                "Access-Control-Allow-Origin",
                process.env.FRONTEND_ORIGIN
            );
            res.header(
                "Access-Control-Allow-Methods",
                "POST,OPTIONS,GET,PATCH,DELETE"
            );
            res.header(
                "Access-Control-Allow-Headers",
                "content-type,authorization,user_id"
            );
            res.header("X-Content-Type-Options", "nosniff");
            res.header("X-Permitted-Cross-Domain-Policies", "none");
            res.header(
                "Strict-Transport-Security",
                "max-age=31536000; includeSubDomains"
            );
            res.removeHeader("X-Powered-By");
            next();
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.json({
            message: "There has been an error, please try again later",
        });
    }
});

app.use(express.json());

app.use("/api/v1/notes", notesRouter);

app.use(express.static("./public"));

app.use("/*wildcard", (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN);
    res.header("Access-Control-Allow-Methods", "POST,OPTIONS,GET,PATCH,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "content-type,authorization,user_id"
    );
    res.status(404);
    res.json({ message: "The requested resource does not exist" });
});

export { app };
