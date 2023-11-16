declare module "lastfm";

declare class LastFmNode {
  constructor(api_key: string, secret: string, useragent?: string);
  stream(): RecentTracksStream;
}

declare class RecentTracksStream {
  start(): void;
  stop(): void;
  isStreaming(): boolean;
  on(event: RecentTracksStreamEvent, listener: any): void;
}

declare type RecentTracksStreamEvent = "nowPlaying" | "stoppedPlaying";

declare type Track = {
  artist: CommonInfo;
  streamable: string;
  image: Image[];
  mbid: string;
  album: CommonInfo;
  name: string;
  "@attr": string;
  url: string;
};

declare type CommonInfo = {
  mbid: string;
  "#text": string;
};

declare type Image = {
  size: string;
  "#text": string;
};
