"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshServerPodcast = exports.getPodcastList = void 0;
const axios_1 = require("axios");
const fs_1 = require("fs");
const xml2js_1 = require("xml2js");
const path_1 = require("path");
const dir_1 = require("../dir");
if (!(0, fs_1.existsSync)((0, path_1.join)(dir_1.assetsDir, "/rss"))) {
    (0, fs_1.mkdirSync)((0, path_1.join)(dir_1.assetsDir, "/rss"), { recursive: true });
}
const podcastRss = [
    "https://podcast.global.com/show/3287246/episodes/feed",
    "https://rss.acast.com/theeconomistallaudio",
    "https://podcasts.files.bbci.co.uk/p02nq0gn.rss",
    "https://podcastfeeds.nbcnews.com/l7jK75d0",
    "http://dailyboost.motivationtomove.com/rss",
    "https://feeds.publicradio.org/public_feeds/in-the-dark/itunes/rss",
    "https://www.theguardian.com/news/series/todayinfocus/podcast.xml",
    "https://www.wired.co.uk/rss/podcast",
    "https://rss.art19.com/apology-line",
    "https://www.omnycontent.com/d/playlist/acc8cc57-ff7c-44c5-9bd6-ab0900fbdc43/95a0ba2f-2810-459a-a106-ab09010e1229/89b076fd-9b08-4f8b-95b2-ab09010e123c/podcast.rss",
];
function getPodcastList(res) {
    try {
        const pods = AllChannels();
        res.status(200).send(pods);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "unknown error" });
    }
    return;
}
exports.getPodcastList = getPodcastList;
function AllChannels() {
    let channels = [];
    try {
        for (let i = 0; i < podcastRss.length; i++) {
            console.log("AllChannels", i);
            const rssJson = (0, path_1.join)(dir_1.assetsDir, "./rss/podcast-" + i + ".json");
            const rawData = (0, fs_1.readFileSync)(rssJson, "utf-8");
            let json = JSON.parse(rawData);
            json.channel.forEach((channel) => {
                let newChannel = {
                    title: channel.title[0],
                    description: channel.description[0],
                    image: channel.image[0].url[0],
                    item: [],
                };
                for (let i = 0; i < Math.min(6, channel.item.length); i++) {
                    const item = channel.item[i];
                    newChannel.item.push({
                        title: item.title[0],
                        description: "",
                        pubDate: item.pubDate[0],
                        url: item.enclosure[0]["$"].url,
                        type: item.enclosure[0]["$"].type,
                    });
                }
                channels.push(newChannel);
            });
        }
    }
    catch (err) {
        console.log("Err in AllChannels()");
    }
    return channels;
}
function RefreshServerPodcast() {
    try {
        for (let i = 0; i < podcastRss.length; i++) {
            const rss = podcastRss[i];
            const rssJson = (0, path_1.join)(dir_1.assetsDir, "./rss/podcast-" + i + ".json");
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
exports.RefreshServerPodcast = RefreshServerPodcast;
