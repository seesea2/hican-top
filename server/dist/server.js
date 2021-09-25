"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path_1 = require("path");
const dir_1 = require("./dir");
const router_1 = require("./router");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router_1.default);
app.get("/", (req, res) => {
    return res.status(200).sendFile((0, path_1.join)(dir_1.clientDir, "/dist/index.html"));
});
app.use(express.static((0, path_1.join)(dir_1.clientDir, "/dist")));
app.all("/*", (req, res) => {
    return res.status(200).sendFile((0, path_1.join)(dir_1.clientDir, "/dist/index.html"));
});
app.use((req, res, next) => {
    return res
        .status(500)
        .send({ message: "Issue happened. Please retry later!" });
});
app.listen(8080, () => {
    console.log("Server is listening HTTP on port 8080.");
});
