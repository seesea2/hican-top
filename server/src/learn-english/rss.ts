// not in use.

const urls = [
  "https://feeds.skynews.com/feeds/rss/home.xml",
  //   "https://feeds.skynews.com/feeds/rss/uk.xml",
  //   "https://feeds.skynews.com/feeds/rss/business.xml",
  //   "https://feeds.skynews.com/feeds/rss/politics.xml",
  //   "https://feeds.skynews.com/feeds/rss/technology.xml",
  //   "https://feeds.skynews.com/feeds/rss/strange.xml",
];

interface Channel {
  title: string;
  description: string;
  item: Item[];
}

interface Item {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export { urls, Channel, Item };
