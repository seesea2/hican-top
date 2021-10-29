import { Response } from "express";
import { existsSync, mkdirSync, openSync, closeSync } from "fs";
import { join } from "path";
import { assetsDir } from "../dir";
import { getUserNewWords, addUserWord } from "./words";

if (!existsSync(join(assetsDir, "/english"))) {
  mkdirSync(join(assetsDir, "/english"), { recursive: true });
}

function createUser(name: string, res: Response) {
  try {
    let file = join(assetsDir, `/english/${name}.usr`);
    closeSync(openSync(file, "a"));
    res.status(200).send({ message: "Done" });
  } catch (e) {
    res.status(500).send({ message: "Server Error." });
  }
}

function learnWords(name: string, res: Response) {
  try {
    let words = getUserNewWords(name);
    words.sort(() => Math.random() - 0.5);
    words = words.slice(0, 50);
    res.status(200).send(JSON.stringify(words));
  } catch (e) {
    res.status(500).send({ message: "Server Error." });
  }
}

function addWord(name: string, word: string, res: Response) {
  try {
    let rslt = addUserWord(name, word);
    if (rslt) {
      res.status(200).send({ message: "Done" });
    } else {
      res.status(400).send({ message: "Failed." });
    }
  } catch (e) {
    res.status(500).send({ message: "Server Error." });
  }
}

export { createUser, learnWords, addWord };
