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
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL,
            age INTEGER NOT NULL,
            is_admin INTEGER NOT NULL
            ) STRICT
        `);
        database.exec(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            is_completed INTEGER DEFAULT 0,
            created_at INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
            ) STRICT
        `);
    } catch (err) {
        console.error(err);
    }
}

startApp();

export { database };
