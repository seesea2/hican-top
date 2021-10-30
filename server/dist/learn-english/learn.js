"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWord = exports.learntWordsCount = exports.learnWords = exports.createUser = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const dir_1 = require("../dir");
const words_1 = require("./words");
if (!(0, fs_1.existsSync)((0, path_1.join)(dir_1.assetsDir, "/english"))) {
    (0, fs_1.mkdirSync)((0, path_1.join)(dir_1.assetsDir, "/english"), { recursive: true });
}
function createUser(name, res) {
    try {
        let file = (0, path_1.join)(dir_1.assetsDir, `/english/${name}.usr`);
        (0, fs_1.closeSync)((0, fs_1.openSync)(file, "a"));
        res.status(200).send({ message: "Done" });
    }
    catch (e) {
        res.status(500).send({ message: "Server Error." });
    }
}
exports.createUser = createUser;
function learnWords(name, res) {
    try {
        let words = (0, words_1.getUserNewWords)(name);
        words.sort(() => Math.random() - 0.5);
        words = words.slice(0, 50);
        res.status(200).send(JSON.stringify(words));
    }
    catch (e) {
        res.status(500).send({ message: "Server Error." });
    }
}
exports.learnWords = learnWords;
function learntWordsCount(name, res) {
    try {
        let words = (0, words_1.getUserWords)(name);
        res.status(200).send(JSON.stringify({ count: words.length }));
    }
    catch (e) {
        res.status(500).send({ message: "Server Error." });
    }
}
exports.learntWordsCount = learntWordsCount;
function addWord(name, word, res) {
    try {
        let rslt = (0, words_1.addUserWord)(name, word);
        if (rslt) {
            res.status(200).send({ message: "Done" });
        }
        else {
            res.status(400).send({ message: "Failed." });
        }
    }
    catch (e) {
        res.status(500).send({ message: "Server Error." });
    }
}
exports.addWord = addWord;
