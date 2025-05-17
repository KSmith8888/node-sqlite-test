import { DatabaseSync } from "node:sqlite";
const database = new DatabaseSync("./notes.db");

const getNotes = async (req, res) => {
    try {
        database.exec(`
        CREATE TABLE IF NOT EXISTS notes(
            key INTEGER PRIMARY KEY,
            title TEXT,
            content TEXT
            ) STRICT
        `);
        const insert = database.prepare(
            "INSERT INTO notes (key, title, content) VALUES (?, ?, ?)"
        );
        insert.run(1, "First Title", "The content of the first note");
        insert.run(2, "Now the Second", "Finally the second note");
        const query = database.prepare("SELECT * FROM notes ORDER BY key");
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

const createNote = async (req, res) => {
    try {
        const id = crypto.randomUUID();
        const title = req.body.title;
        const content = req.body.content;
        if (
            !id ||
            !title ||
            !content ||
            typeof id !== "number" ||
            typeof title !== "string" ||
            typeof content !== "string"
        ) {
            throw new Error("Note info not provided");
        }
        const insert = database.prepare(
            "INSERT INTO notes (key, title, content) VALUES (?, ?, ?)"
        );
        insert.run(id, title, content);
        const query = database.prepare("SELECT * FROM notes ORDER BY key");
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

export { getNotes, createNote, editNote, deleteNote };
