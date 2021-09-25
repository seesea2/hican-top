import axios from "axios";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { parseString } from "xml2js";
import { join } from "path";

import { assetsDir } from "../dir";
import { Channel } from "./podcast-interface";

if (!existsSync(join(assetsDir, "/rss"))) {
  mkdirSync(join(assetsDir, "/rss"), { recursive: true });
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
];

function getPodcastList(res: any) {
  try {
    const pods = AllChannels();
    res.status(200).send(pods);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "unknown error" });
  }
  return;
}

function AllChannels() {
  let channels: Channel[] = [];
  try {
    for (let i = 0; i < podcastRss.length; i++) {
      console.log("AllChannels", i);
      const rssJson = join(assetsDir, "./rss/podcast-" + i + ".json");
      const rawData = readFileSync(rssJson, "utf-8");
      let json = JSON.parse(rawData);
      json.channel.forEach((channel: any) => {
        let newChannel: Channel = {
          title: channel.title[0],
          description: channel.description[0],
          image: channel.image[0].url[0],
          item: [],
        };

        for (let i = 0; i < Math.min(6, channel.item.length); i++) {
          const item = channel.item[i];
          newChannel.item.push({
            title: item.title[0],
            description: "", //item.description[0],
            pubDate: item.pubDate[0],
            url: item.enclosure[0]["$"].url,
          });
        }
        channels.push(newChannel);
      });
    }
  } catch (err) {
    console.log("Err in AllChannels()");
  }
  return channels;
}

function RefreshServerPodcast() {
  try {
    for (let i = 0; i < podcastRss.length; i++) {
      const rss = podcastRss[i];
      const rssJson = join(assetsDir, "./rss/podcast-" + i + ".json");
      axios.get(rss).then((resp) => {
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

export { getPodcastList, RefreshServerPodcast };
