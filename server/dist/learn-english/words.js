"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserWord = exports.getUserNewWords = void 0;
const fs_1 = require("fs");
const dir_1 = require("../dir");
const path_1 = require("path");
let masterWords = [];
function readWords(file) {
    let words = [];
    try {
        if ((0, fs_1.existsSync)(file)) {
            let rawData = (0, fs_1.readFileSync)(file, "utf8");
            words = rawData
                .replace(/\r\n/g, " ")
                .replace(/\n/g, " ")
                .split(" ")
                .map((w) => w.toLowerCase())
                .filter((item) => {
                return (!item.includes("'") &&
                    !item.includes(":") &&
                    item[0] >= "a" &&
                    item[0] <= "z");
            });
        }
    }
    catch (e) {
        console.log("Exception in readWords()");
    }
    return words;
}
function getMasterWords() {
    try {
        const masterWordFile = (0, path_1.join)(dir_1.assetsDir, "/british-english");
        masterWords = readWords(masterWordFile);
    }
    catch (e) {
        console.log(e);
    }
}
function getUserWords(name) {
    let words = [];
    try {
        if (!name) {
            return words;
        }
        let file = (0, path_1.join)(dir_1.assetsDir, `/english/${name}.usr`);
        words = readWords(file);
    }
    catch (e) {
        console.log(e);
    }
    return words;
}
function addUserWord(name, word) {
    try {
        if (!word) {
            return;
        }
        let file = (0, path_1.join)(dir_1.assetsDir, `/english/${name}.usr`);
        if ((0, fs_1.existsSync)(file)) {
            (0, fs_1.appendFileSync)(file, word + "\n");
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log(e);
    }
    return false;
}
exports.addUserWord = addUserWord;
function getUserNewWords(name) {
    let newWords = [];
    try {
        if (!name) {
            return masterWords;
        }
        let words = getUserWords(name);
        if (words.length <= 0) {
            return masterWords;
        }
        newWords = masterWords.filter((w) => {
            return !words.includes(w);
        });
    }
    catch (e) {
        console.log(e);
    }
    return newWords;
}
exports.getUserNewWords = getUserNewWords;
getMasterWords();
