import { database } from "./index.js";

const getAllUsers = async (req, res) => {
    try {
        database.exec(`
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL,
            age INTEGER NOT NULL
            ) STRICT
        `);
        const query = database.prepare("SELECT * FROM users ORDER BY id");
        const allUsers = query.all();
        const nameQuery = database.prepare(
            "SELECT name FROM users ORDER BY name"
        );
        const allNames = nameQuery.all();
        res.status(200);
        res.json({
            message: "Got the users",
            users: allUsers,
            names: allNames,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) throw new Error("No user id provided");
        const idNum = parseInt(userId, 10);
        if (typeof idNum !== "number")
            throw new Error("User id is not a number");
        const getUser = database.prepare("SELECT * FROM users WHERE id = ?");
        const user = getUser.all(idNum);
        const message =
            user.length > 0 ? "Got user by id" : "No user found with that id";
        res.status(200);
        res.json({ message, users: user });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const createUser = async (req, res) => {
    try {
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const age = req.body.age;
        if (
            !name ||
            !username ||
            !password ||
            !email ||
            !age ||
            typeof name !== "string" ||
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof email !== "string" ||
            typeof parseInt(age, 10) !== "number"
        ) {
            throw new Error("User info not provided");
        }
        const insert = database.prepare(
            "INSERT INTO users (name, username, password, email, age) VALUES (?, ?, ?, ?, ?)"
        );
        insert.run(name, username, password, email, parseInt(age, 10));
        const query = database.prepare("SELECT * FROM users ORDER BY id");
        const allUsers = query.all();
        res.status(201);
        res.json({
            message: "Created a user",
            users: allUsers,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (
            !username ||
            !password ||
            typeof username !== "string" ||
            typeof password !== "string"
        ) {
            throw new Error("Invalid username or password");
        }
        const checkForUser = database.prepare(
            "SELECT * FROM users WHERE username=?"
        );
        const userResult = checkForUser.all(username);
        if (userResult.length !== 1 || userResult[0].password !== password) {
            throw new Error("No user found or password does not match");
        }
        res.status(200);
        res.json({
            message: "User is logged in",
            users: userResult,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const updateEmail = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) throw new Error("No user id provided");
        const idNum = parseInt(userId, 10);
        if (typeof idNum !== "number")
            throw new Error("User id is not a number");
        const email = req.body.email;
        if (!email || typeof email !== "string")
            throw new Error("No valid email provided");
        const emailQuery = database.prepare(
            "UPDATE users SET email = ? WHERE id = ?"
        );
        const updatedUser = emailQuery.all(email, idNum);
        res.status(200);
        res.json({
            message: "Updated a user",
            users: updatedUser,
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) throw new Error("No user id provided");
        const idNum = parseInt(userId, 10);
        if (typeof idNum !== "number")
            throw new Error("User id is not a number");
        const deleteUser = database.prepare("DELETE FROM users WHERE id = ?");
        deleteUser.all(idNum);
        res.status(200);
        res.json({
            message: "Deleted a user",
        });
    } catch (error) {
        console.log(error.message);
        res.status(401);
        res.json({
            message: error.message,
        });
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        const deleteStatement = database.prepare("DROP TABLE users");
        deleteStatement.run();
        res.status(200);
        res.json({
            message: "Deleted all users",
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
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    updateEmail,
    deleteUserById,
    deleteAllUsers,
};
