import { CONFIG } from "../context/components/Configuration";
import { LoggerFactory } from "../context/components/LoggerFactory";
import { ProvideAsSingleton } from "../context/IocProvider";
import { InternalServiceProvider } from "./InternalServiceProvider";
import got from 'got';
import { mapErrorCode } from "../models/Errors";
import { LyricsSnippet } from "../graphQL/responses/LyricsSnippet";

@ProvideAsSingleton(MusixmatchServiceProvider)
export class MusixmatchServiceProvider extends InternalServiceProvider {

  private logger: Logger = LoggerFactory.getLogger('MusixmatchServiceProvider');
  private baseUrl: string;

  constructor() {
    super();
    this.baseUrl = CONFIG.musixmatch.address.replace(/\/$/, '');
  }

  public async getLyricsSnippet(): Promise<LyricsSnippet> {
    const tracks = await this.getTrackSearch();
    const randomIndex = Math.floor(Math.random() * 2);
    const trackSnippet = await this.getTrackSnippet(tracks[randomIndex].track.track_id);

    return {
      snippetBody: trackSnippet.snippet_body,
      rightArtist: tracks[randomIndex].track.artist_name,
      artistOptions: tracks.map(artist => artist.track.artist_name)
    };
  }

  public async getTrackSearch(): Promise<MusixmatchTrackSearchResponse[] | null> {
    let options: any = await this.getDefaultOptions();

    options.searchParams = {
      ...options.searchParams,
      s_track_rating: 'asc',
      page_size: 3,
      page: Math.floor(Math.random() * 100),
      f_has_lyrics: 1
    };

    this.logger.debug(`Requesting track search`);
    return got.get<MusixmatchResponse>(`${this.baseUrl}/ws/1.1/track.search`, options)
      .then(({ body: { message } }) => {
        if (message?.header?.status_code != 200) {
          throw message.header;
        }

        if (!!message?.body?.track_list) {
          return message.body.track_list;
        }
        return null;
      })
      .catch((error => {
        this.logger.error(`Failed to request a track search. Error: ${error}`);

        throw new Error(mapErrorCode(error));
      }));
  }

  public async getTrackSnippet(trackId: number): Promise<MusixmatchTrackSnippetResponse | null> {
    let options: any = await this.getDefaultOptions();

    options.searchParams = {
      ...options.searchParams,
      format: 'json',
      track_id: trackId
    };

    this.logger.debug(`Requesting track snippet with trackId: ${trackId}`);
    return got.get<MusixmatchResponse>(`${this.baseUrl}/ws/1.1/track.snippet.get`, options)
      .then(({ body: { message } }) => {
        if (message?.header?.status_code != 200) {
          throw message.header;
        }

        if (!!message?.body?.snippet) {
          return message.body.snippet;
        }
        return null;
      })
      .catch((error => {
        this.logger.error(`Failed to request a track snippet with trackId: ${trackId}. Error: ${error.message}`);

        throw new Error(mapErrorCode(error));
      }));
  }
}