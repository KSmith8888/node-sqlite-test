import { DatabaseSync } from "node:sqlite";
const database = new DatabaseSync("./notes.db");

const getNotes = async (req, res) => {
    try {
        database.exec(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY,
            title TEXT,
            content TEXT
            ) STRICT
        `);
        const query = database.prepare("SELECT * FROM notes ORDER BY id");
        const allNotes = query.all();
        res.status(200);
        res.json({
            message: "Got the notes",
            notes: allNotes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        res.status(200);
        res.json({ message: "Got note by id" });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const createNote = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        if (
            !title ||
            !content ||
            typeof title !== "string" ||
            typeof content !== "string"
        ) {
            throw new Error("Note info not provided");
        }
        const insert = database.prepare(
            "INSERT INTO notes (title, content) VALUES (?, ?)"
        );
        insert.run(title, content);
        const query = database.prepare("SELECT * FROM notes ORDER BY id");
        const allNotes = query.all();
        res.status(201);
        res.json({
            message: "Created a note",
            notes: allNotes,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const editNote = async (req, res) => {
    try {
        res.status(200);
        res.json({
            message: "Edited a note",
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        res.status(200);
        res.json({
            message: "Deleted a note",
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

export { getNotes, getNoteById, createNote, editNote, deleteNote };
