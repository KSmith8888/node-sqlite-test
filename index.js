import { app } from "./app.js";
import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("./notes.db");

const PORT = process.env.PORT || 3000;

async function startApp() {
    try {
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
        database.exec(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
            ) STRICT
        `);
        database.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            age INTEGER NOT NULL
            ) STRICT
        `);
    } catch (err) {
        console.error(err);
    }
}

startApp();

export { database };
