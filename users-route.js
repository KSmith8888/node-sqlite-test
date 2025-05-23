import express from "express";

import { getAllUsers, getUserById, createUser } from "./users-controller.js";

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

const usersRouter = express.Router();

usersRouter.options("/*wildcard", optionsPreflight);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/create", createUser);

export { usersRouter };
