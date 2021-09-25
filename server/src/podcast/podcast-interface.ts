export interface Channel {
  title: string;
  description: string;
  image: string;
  item: Item[];
}

export interface Item {
  title: string;
  description: string;
  pubDate: string;
  url: string;
}
