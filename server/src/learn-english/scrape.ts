// not in use.

import Axios from "axios";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import * as cheerio from "cheerio";
import { parseString } from "xml2js";
import { join } from "path";
import { assetsDir } from "../dir";
import { urls, Channel } from "./rss";

if (!existsSync(join(assetsDir, "/rss"))) {
  mkdirSync(join(assetsDir, "/rss"), { recursive: true });
}

function RefreshRss() {
  try {
    for (let i = 0; i < urls.length; i++) {
      const rss = urls[i];
      const rssJson = join(assetsDir, "./rss/web-" + i + ".json");
      Axios.get(rss).then((resp) => {
        parseString(resp.data, (err, rslt) => {
          if (err) {
            return;
          }
          if (rslt && rslt.rss) {
            writeFileSync(rssJson, JSON.stringify(rslt.rss));
          }
        });
      });
    }
  } catch (err) {
    console.log("rss refresh failed:");
    console.log(err);
  }
}

function AllChannels() {
  let webs: Channel[] = [];
  try {
    for (let i = 0; i < urls.length; i++) {
      console.log("AllChannels", i);
      const rssJson = join(assetsDir, "./rss/web-" + i + ".json");
      const rawData = readFileSync(rssJson, "utf-8");
      let json = JSON.parse(rawData);
      json.channel.forEach((channel: any) => {
        let newChannel: Channel = {
          title: channel.title[0],
          description: "",
          item: [],
        };
        for (let i = 0; i < channel.item.length; i++) {
          const item = channel.item[i];
          newChannel.item.push({
            title: item.title[0],
            description: "",
            link: item.link[0],
            pubDate: item.pubDate[0],
          });
        }
        webs.push(newChannel);
      });
    }
  } catch (err) {
    console.log("Err in AllChannels()");
  }
  return webs;
}

function Scraper() {
  let channels = AllChannels();
  channels.forEach((channel) => {
    for (let i = 0; i < channel.item.length; ++i) {
      let web = channel.item[i];
      console.log(web.link);
      Axios.get(web.link).then((resp) => {
        // console.log(resp.data);
        let $ = cheerio.load(resp.data);
        // $("body").each((i, e) => {
        //   console.log($(e));
        // });
        let texts = $("body .section-wrap *")
          .contents()
          .map(function () {
            return this.type == "text" ? $(this).text() + " " : "";
          })
          .get()
          .join("");

        let words = texts.replace(/\s\s+/g, "");
        let wordSet = new Set();
        words.split(" ").forEach((split1) => {
          split1.split("'").forEach((split2) => {
            split2.split('"').forEach((word) => {
              if (word.length <= 2) return;
              wordSet.add(word.toLowerCase());
            });
          });
        });
        console.log(wordSet);
        return;
      });
      break;
    }
  });
}

// scrapeUrls("https://news.sky.com/");
// scrapeUrls("https://www.bbc.com/");
// RefreshRss();
// Scraper();
