import { existsSync, readFileSync, appendFileSync } from "fs";
import { assetsDir } from "../dir";
import { join } from "path";

let masterWords: string[] = [];

function readWords(file: string) {
  let words: string[] = [];
  try {
    if (existsSync(file)) {
      let rawData = readFileSync(file, "utf8");
      words = rawData
        .replace(/\r\n/g, " ")
        .replace(/\n/g, " ")
        .split(" ")
        .map((w) => w.toLowerCase())
        .filter((item) => {
          return (
            !item.includes("'") &&
            !item.includes(":") &&
            item[0] >= "a" &&
            item[0] <= "z"
          );
        });
    }
  } catch (e) {
    console.log("Exception in readWords()");
  }
  return words;
}

function getMasterWords() {
  try {
    const masterWordFile = join(assetsDir, "/british-english");
    masterWords = readWords(masterWordFile);
  } catch (e) {
    console.log(e);
  }
}

function getUserWords(name: string) {
  let words: string[] = [];
  try {
    if (!name) {
      return words;
    }
    let file = join(assetsDir, `/english/${name}.usr`);
    words = readWords(file);
  } catch (e) {
    console.log(e);
  }
  return words;
}

function addUserWord(name: string, word: string) {
  try {
    if (!word) {
      return;
    }
    let file = join(assetsDir, `/english/${name}.usr`);
    if (existsSync(file)) {
      appendFileSync(file, word + "\n");
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

function getUserNewWords(name: string) {
  let newWords: string[] = [];
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
  } catch (e) {
    console.log(e);
  }
  return newWords;
}

getMasterWords();

export { getUserNewWords, addUserWord };
