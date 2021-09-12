import * as express from "express";
import { join } from "path";

import { clientDir } from "./dir";
import apiRouter from "./router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);
app.get("/", (req, res) => {
  return res.status(200).sendFile(join(clientDir, "/dist/index.html"));
});

app.use(express.static(join(clientDir, "/dist")));

// error handling - 1
app.all("/*", (req, res) => {
  return res.status(200).sendFile(join(clientDir, "/dist/index.html"));
});
// error handling - 2
app.use((req, res, next) => {
  return res.status(500).send("Issue happened. Please retry later!");
});

app.listen(8080, () => {
  console.log("Server is listening HTTP on port 8080.");
});
