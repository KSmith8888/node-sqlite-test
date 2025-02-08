import express from "express";

import {
    getNotes,
    createNote,
    editNote,
    deleteNote,
} from "./notes-controller.js";

const notesRouter = express.Router();

notesRouter.get("/", getNotes);
notesRouter.post("/create", createNote);
notesRouter.patch("/edit", editNote);
notesRouter.delete("/delete", deleteNote);

export { notesRouter };
