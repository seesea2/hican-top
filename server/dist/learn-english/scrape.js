"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs_1 = require("fs");
const cheerio = require("cheerio");
const xml2js_1 = require("xml2js");
const path_1 = require("path");
const dir_1 = require("../dir");
const rss_1 = require("./rss");
if (!(0, fs_1.existsSync)((0, path_1.join)(dir_1.assetsDir, "/rss"))) {
    (0, fs_1.mkdirSync)((0, path_1.join)(dir_1.assetsDir, "/rss"), { recursive: true });
}
function RefreshRss() {
    try {
        for (let i = 0; i < rss_1.urls.length; i++) {
            const rss = rss_1.urls[i];
            const rssJson = (0, path_1.join)(dir_1.assetsDir, "./rss/web-" + i + ".json");
            axios_1.default.get(rss).then((resp) => {
                (0, xml2js_1.parseString)(resp.data, (err, rslt) => {
                    if (err) {
                        return;
                    }
                    if (rslt && rslt.rss) {
                        (0, fs_1.writeFileSync)(rssJson, JSON.stringify(rslt.rss));
                    }
                });
            });
        }
    }
    catch (err) {
        console.log("rss refresh failed:");
        console.log(err);
    }
}
function AllChannels() {
    let webs = [];
    try {
        for (let i = 0; i < rss_1.urls.length; i++) {
            console.log("AllChannels", i);
            const rssJson = (0, path_1.join)(dir_1.assetsDir, "./rss/web-" + i + ".json");
            const rawData = (0, fs_1.readFileSync)(rssJson, "utf-8");
            let json = JSON.parse(rawData);
            json.channel.forEach((channel) => {
                let newChannel = {
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
    }
    catch (err) {
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
            axios_1.default.get(web.link).then((resp) => {
                let $ = cheerio.load(resp.data);
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
                            if (word.length <= 2)
                                return;
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
