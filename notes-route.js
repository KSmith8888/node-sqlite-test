import express from "express";

import {
    getNotes,
    createNote,
    editNote,
    deleteNote,
} from "./notes-controller.js";

const optionsPreflight = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN);
        res.header(
            "Access-Control-Allow-Methods",
            "POST,OPTIONS,GET,PATCH,DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "content-type,authorization,user_id"
        );
        res.status(200);
        res.json({ message: "Preflight Passed" });
    } catch (error) {
        res.status(401);
        res.json({ message: "Did not pass" });
    }
};

const notesRouter = express.Router();

notesRouter.options("/create", optionsPreflight);
notesRouter.get("/", getNotes);
notesRouter.post("/create", createNote);
notesRouter.patch("/edit", editNote);
notesRouter.delete("/delete", deleteNote);

export { notesRouter };
