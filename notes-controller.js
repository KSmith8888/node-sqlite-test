import { DatabaseSync } from "node:sqlite";
const database = new DatabaseSync("./notes.db");
database.exec(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
            ) STRICT
        `);

const getAllNotes = async (req, res) => {
    try {
        database.exec(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
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
        const noteId = req.params.id;
        if (!noteId) throw new Error("No note id provided");
        const idNum = parseInt(noteId, 10);
        if (typeof idNum !== "number")
            throw new Error("Note id is not a number");
        const getNote = database.prepare("SELECT * FROM notes WHERE id = ?");
        const note = getNote.all(idNum);
        const message =
            note.length > 0 ? "Got note by id" : "No note found with that id";
        res.status(200);
        res.json({ message, notes: note });
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
        const noteId = req.params.id;
        const newTitle = req.body.title;
        const newContent = req.body.content;
        if (
            !noteId ||
            !newTitle ||
            typeof newTitle !== "string" ||
            !newContent ||
            typeof newContent !== "string"
        ) {
            throw new Error("No note id provided");
        }
        const idNum = parseInt(noteId, 10);
        if (typeof idNum !== "number")
            throw new Error("Note id is not a number");
        const editStatment = database.prepare(
            "UPDATE notes SET title = ?, content = ? WHERE id = ?"
        );
        editStatment.all(newTitle, newContent, idNum);
        const getUpdated = database.prepare("SELECT * FROM notes WHERE id = ?");
        const updatedNote = getUpdated.all(idNum);
        res.status(200);
        res.json({
            message: "Edited a note",
            notes: updatedNote,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const deleteNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        if (!noteId) throw new Error("No note id provided");
        const idNum = parseInt(noteId, 10);
        if (typeof idNum !== "number")
            throw new Error("Note id is not a number");
        const deleteNote = database.prepare("DELETE FROM notes WHERE id = ?");
        deleteNote.all(idNum);
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

const deleteAllNotes = async (req, res) => {
    try {
        const deleteStatement = database.prepare("DROP TABLE notes");
        deleteStatement.run();
        res.status(200);
        res.json({
            message: "Deleted all notes",
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

export {
    getAllNotes,
    getNoteById,
    createNote,
    editNote,
    deleteNoteById,
    deleteAllNotes,
};
