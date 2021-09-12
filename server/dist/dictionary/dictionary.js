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
exports.CheckOxfordLemmas = exports.CheckOxfordEntries = void 0;
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
function CheckOxfordEntries(word, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word || !word.trim()) {
            return res.status(400).send({ message: "Invalid word." });
        }
        word = word.trim().toLowerCase();
        if (process.env.DEBUG) {
            console.log(word);
        }
        const url = "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" +
            word +
            "?fields=definitions%2Cpronunciations%2Cexamples&strictMatch=false";
        try {
            const file = (0, path_1.join)(dir_1.assetsDir, "/oxford/json/" + word + ".json");
            if ((0, fs_1.existsSync)(file)) {
                let rawData = (0, fs_1.readFileSync)(file, "utf8");
                let fileData = JSON.parse(rawData);
                if (process.env.DEBUG) {
                    console.log("cache:", fileData);
                }
                return res.status(200).send(fileData);
            }
            let resp = yield (0, axios_1.default)(url, config);
            (0, fs_1.writeFileSync)((0, path_1.join)(dir_1.assetsDir, "/oxford/json/" + word + ".json"), JSON.stringify(resp.data));
            let entries = resp.data;
            if (process.env.DEBUG) {
                console.log("remote:", entries);
            }
            return res.status(200).send(entries);
        }
        catch (e) {
            return res.status(400).send(e);
        }
    });
}
exports.CheckOxfordEntries = CheckOxfordEntries;
function CheckOxfordLemmas(word, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word || !word.trim()) {
            return "Invalid word.";
        }
        const url = "https://od-api.oxforddictionaries.com/api/v2/lemmas/en-gb/" + word;
        try {
            let resp = yield (0, axios_1.default)(url, config);
            const lemmas = resp.data;
            if (process.env.DEBUG) {
                console.log(lemmas);
            }
            res.status(400).send(lemmas);
            return;
        }
        catch (e) {
            if (process.env.DEBUG) {
                console.log(e);
            }
            return e.message;
        }
    });
}
exports.CheckOxfordLemmas = CheckOxfordLemmas;
