import express from "express";

import { notesRouter } from "./notes-route.js";

const app = express();

app.use(express.json());

app.use("/api/v1/notes", notesRouter);

app.use(express.static("./public"));

app.use("*", (req, res) => {
    res.status(404);
    res.json({ message: "The requested resource does not exist" });
});

export { app };
