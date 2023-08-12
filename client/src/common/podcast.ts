export interface Channel {
  title: string;
  description: string;
  image: string;
  item: ChannelItem[];
}

export interface ChannelItem {
  title: string;
  description: string;
  pubDate: string;
  url: string;
  type: string;
}
