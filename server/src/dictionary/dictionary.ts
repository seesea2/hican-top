import Axios from "axios";
import { Response } from "express";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

import { assetsDir } from "../dir";

if (!existsSync(join(assetsDir, "/oxford/json"))) {
  mkdirSync(join(assetsDir, "/oxford/json"), { recursive: true });
}

import { OxfordEntries, OxfordLemmas } from "./oxford-interface";

import { oxford_app_id, oxford_app_key } from "../account-keys";

const config = {
  headers: {
    app_id: oxford_app_id,
    app_key: oxford_app_key,
  },
};

async function CheckWord(word: string, res: Response) {
  if (!word || !word.trim()) {
    return res.status(400).send({ message: "Invalid word." });
  }
  word = word.trim().toLowerCase();
  // console.log("CheckOxfordEntries", word);

  try {
    // get the word from cached word json
    const wordFile = join(assetsDir, "/oxford/json/" + word + ".json");
    if (existsSync(wordFile)) {
      let rawData = readFileSync(wordFile, "utf8");
      let fileData = JSON.parse(rawData);
      // console.log("word is from cache");
      return res.status(200).send(fileData);
    }

    // get the word from Oxford API
    const rslt = await OxfordApiWord(word);
    if (rslt) {
      // console.log("word is from API");
      return res.status(200).send(rslt);
    }

    let lemmas = undefined;
    // get word origin from  cached Lemmas data
    const file = join(assetsDir, "/oxford/json/lemmas-" + word + ".json");
    if (existsSync(file)) {
      const rawData = readFileSync(file, "utf8");
      lemmas = JSON.parse(rawData);
      // console.log("lemmas are from cache");
    } else {
      // get word origin from Oxford Lemmas API
      lemmas = await OxfordApiLemmas(word);
      // console.log("lemmas are from API");
    }
    const word_origin =
      lemmas.results[0].lexicalEntries[0].inflectionOf[0].text;
    if (word_origin && word_origin != word) {
      const rslt = await OxfordApiWord(word_origin);
      if (rslt) {
        return res.status(200).send(rslt);
      }
    }
    return res.status(400).send({ message: "The word is not found." });
  } catch (e) {
    return res.status(400).send({ message: "The word is not found." });
  }
}

async function OxfordApiWord(word: string) {
  try {
    const url =
      "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" +
      word +
      "?fields=definitions%2Cpronunciations%2Cexamples&strictMatch=false";
    let resp = await Axios(url, config);
    const entries: OxfordEntries = resp.data;
    // console.log(entries);
    writeFileSync(
      join(assetsDir, "/oxford/json/" + word + ".json"),
      JSON.stringify(entries)
    );
    return entries;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function OxfordApiLemmas(word: string) {
  try {
    const url =
      "https://od-api.oxforddictionaries.com/api/v2/lemmas/en-gb/" + word;
    const resp = await Axios(url, config);
    const lemmas: OxfordLemmas = resp.data;
    // console.log(lemmas);
    writeFileSync(
      join(assetsDir, "/oxford/json/lemmas-" + word + ".json"),
      JSON.stringify(lemmas)
    );
    return lemmas;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function CheckLemmas(word: string, res: Response) {
  if (!word || !word.trim()) {
    return "Invalid word.";
  }

  try {
    let rslt = await OxfordApiLemmas(word);
    return res.status(200).send(rslt);
  } catch (e) {
    return res.status(400).send({ message: "The word is not found." });
  }
}

export { CheckWord, CheckLemmas };
