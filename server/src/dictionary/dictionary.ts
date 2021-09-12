import Axios from "axios";
import { Response } from "express";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { assetsDir } from "../dir";

if (!existsSync(join(assetsDir, "/oxford/json"))) {
  mkdirSync(join(assetsDir, "/oxford/json"), { recursive: true });
}

import {
  CheckEntriesResult,
  OxfordEntries,
  OxfordLemmas,
  IdText,
  YcLexicalEntry,
} from "./oxford-interface";

import { oxford_app_id, oxford_app_key } from "../account-keys";

const config = {
  headers: {
    app_id: oxford_app_id,
    app_key: oxford_app_key,
  },
};

async function CheckOxfordEntries(word: string, res: Response) {
  if (!word || !word.trim()) {
    return res.status(400).send({ message: "Invalid word." });
  }
  word = word.trim().toLowerCase();
  if (process.env.DEBUG) {
    console.log(word);
  }

  const url =
    "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" +
    word +
    "?fields=definitions%2Cpronunciations%2Cexamples&strictMatch=false";

  try {
    const file = join(assetsDir, "/oxford/json/" + word + ".json");
    if (existsSync(file)) {
      let rawData = readFileSync(file, "utf8");
      let fileData = JSON.parse(rawData);
      if (process.env.DEBUG) {
        console.log("cache:", fileData);
      }
      return res.status(200).send(fileData);
    }

    let resp = await Axios(url, config);
    writeFileSync(
      join(assetsDir, "/oxford/json/" + word + ".json"),
      JSON.stringify(resp.data)
    );
    let entries: OxfordEntries = resp.data;
    if (process.env.DEBUG) {
      console.log("remote:", entries);
    }
    return res.status(200).send(entries);
  } catch (e) {
    return res.status(400).send(e);
  }
}

async function CheckOxfordLemmas(word: string, res: Response) {
  if (!word || !word.trim()) {
    return "Invalid word.";
  }
  const url =
    "https://od-api.oxforddictionaries.com/api/v2/lemmas/en-gb/" + word;

  try {
    let resp = await Axios(url, config);
    const lemmas: OxfordLemmas = resp.data;
    if (process.env.DEBUG) {
      console.log(lemmas);
    }
    res.status(400).send(lemmas);
    return;
  } catch (e) {
    if (process.env.DEBUG) {
      console.log(e);
    }
    return e.message;
  }
}

export { CheckOxfordEntries, CheckOxfordLemmas };
