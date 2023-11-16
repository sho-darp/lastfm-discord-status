import { LastFmNode } from "lastfm";
import rpc from "discord-rpc";
import { GetAPIKey, GetSecret } from "./store";

const CLIENT_ID = "1172130857398583396";

export class RichPresenceUpdator {
  client: rpc.Client;
  lastFmStream: RecentTracksStream;
  username: string;
  nowPlayingHandler: any;

  constructor(username: string) {
    this.username = username;
    this.client = new rpc.Client({ transport: "ipc" });
    const lastFmNode = new LastFmNode({
      api_key: GetAPIKey(), // sign-up for a key at http://www.last.fm/api
      secret: GetSecret(),
      useragent: "lastfm-discord-status/v0.01", // optional. defaults to lastfm-node.
    });

    this.lastFmStream = null as any;
    try {
      this.lastFmStream = lastFmNode.stream(username);
    } catch (e) {
      console.error(e);
    }
  }

  SetNowPlayingEvent(handler?: (track: Track) => void) {
    this.lastFmStream.on("nowPlaying", async (track: Track) => {
      await this.UpdateRichPresence(track);

      if (handler != null) {
        handler(track);
      }
    });
  }

  SetStoppedPlayingEvent(handler?: (track: Track) => void) {
    this.lastFmStream.on("stoppedPlaying", (track: Track) => {
      this.client.clearActivity();

      if (handler != null) {
        handler(track);
      }
    });
  }

  Start() {
    this.lastFmStream.start();
  }

  async UpdateRichPresence(track: any) {
    this.client.on("ready", () => {
      this.client.setActivity({
        details: track.name,
        state: `${track.artist["#text"]} - ${track.album["#text"]}`,
        buttons: [
          {
            label: "Last.fm",
            url: `https://www.last.fm/ja/user/${this.username}`,
          },
        ],
        largeImageKey: track.image[1]["#text"],
        largeImageText: track.album["#text"],
      });
    });

    try {
      await this.client.login({ clientId: CLIENT_ID });
    } catch (e) {
      console.error(e);
    }
  }
}
