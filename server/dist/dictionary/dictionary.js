"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckLemmas = exports.CheckWord = void 0;
const axios_1 = require("axios");
const fs_1 = require("fs");
const path_1 = require("path");
const dir_1 = require("../dir");
if (!(0, fs_1.existsSync)((0, path_1.join)(dir_1.assetsDir, "/oxford/json"))) {
    (0, fs_1.mkdirSync)((0, path_1.join)(dir_1.assetsDir, "/oxford/json"), { recursive: true });
}
const account_keys_1 = require("../account-keys");
const config = {
    headers: {
        app_id: account_keys_1.oxford_app_id,
        app_key: account_keys_1.oxford_app_key,
    },
};
function CheckWord(word, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word || !word.trim()) {
            return res.status(400).send({ message: "Invalid word." });
        }
        word = word.trim().toLowerCase();
        console.log("CheckOxfordEntries", word);
        try {
            const wordFile = (0, path_1.join)(dir_1.assetsDir, "/oxford/json/" + word + ".json");
            if ((0, fs_1.existsSync)(wordFile)) {
                let rawData = (0, fs_1.readFileSync)(wordFile, "utf8");
                let fileData = JSON.parse(rawData);
                console.log("word is from cache");
                return res.status(200).send(fileData);
            }
            const rslt = yield OxfordApiWord(word);
            if (rslt) {
                console.log("word is from API");
                return res.status(200).send(rslt);
            }
            let lemmas = undefined;
            const file = (0, path_1.join)(dir_1.assetsDir, "/oxford/json/lemmas-" + word + ".json");
            if ((0, fs_1.existsSync)(file)) {
                const rawData = (0, fs_1.readFileSync)(file, "utf8");
                lemmas = JSON.parse(rawData);
                console.log("lemmas are from cache");
            }
            else {
                lemmas = yield OxfordApiLemmas(word);
                console.log("lemmas are from API");
            }
            const word_origin = lemmas.results[0].lexicalEntries[0].inflectionOf[0].text;
            if (word_origin && word_origin != word) {
                const rslt = yield OxfordApiWord(word_origin);
                if (rslt) {
                    return res.status(200).send(rslt);
                }
            }
            return res.status(400).send({ message: "The word is not found." });
        }
        catch (e) {
            return res.status(400).send({ message: "The word is not found." });
        }
    });
}
exports.CheckWord = CheckWord;
function OxfordApiWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" +
                word +
                "?fields=definitions%2Cpronunciations%2Cexamples&strictMatch=false";
            let resp = yield (0, axios_1.default)(url, config);
            const entries = resp.data;
            console.log(entries);
            (0, fs_1.writeFileSync)((0, path_1.join)(dir_1.assetsDir, "/oxford/json/" + word + ".json"), JSON.stringify(entries));
            return entries;
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
}
function OxfordApiLemmas(word) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = "https://od-api.oxforddictionaries.com/api/v2/lemmas/en-gb/" + word;
            const resp = yield (0, axios_1.default)(url, config);
            const lemmas = resp.data;
            console.log(lemmas);
            (0, fs_1.writeFileSync)((0, path_1.join)(dir_1.assetsDir, "/oxford/json/lemmas-" + word + ".json"), JSON.stringify(lemmas));
            return lemmas;
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
}
function CheckLemmas(word, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word || !word.trim()) {
            return "Invalid word.";
        }
        try {
            let rslt = yield OxfordApiLemmas(word);
            return res.status(200).send(rslt);
        }
        catch (e) {
            return res.status(400).send({ message: "The word is not found." });
        }
    });
}
exports.CheckLemmas = CheckLemmas;
