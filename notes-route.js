import express from "express";

import {
    getAllNotes,
    getNoteById,
    createNote,
    completeNote,
    editNote,
    deleteNoteById,
    deleteAllNotes,
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

notesRouter.options("/*wildcard", optionsPreflight);
notesRouter.get("/", getAllNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.post("/create", createNote);
notesRouter.patch("/complete/:id", completeNote);
notesRouter.patch("/:id", editNote);
notesRouter.delete("/", deleteAllNotes);
notesRouter.delete("/:id", deleteNoteById);

export { notesRouter };
