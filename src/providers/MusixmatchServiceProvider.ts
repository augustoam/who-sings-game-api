import { CONFIG } from "../context/components/Configuration";
import { LoggerFactory } from "../context/components/LoggerFactory";
import { ProvideAsSingleton } from "../context/IocProvider";
import { InternalServiceProvider } from "./InternalServiceProvider";
import got from 'got';
import { mapErrorCode } from "../models/Errors";
import { ChartNamesEnum } from "../models/Enums";
import { Cacheable } from "@type-cacheable/core";

@ProvideAsSingleton(MusixmatchServiceProvider)
export class MusixmatchServiceProvider extends InternalServiceProvider {

  private logger: Logger = LoggerFactory.getLogger('MusixmatchServiceProvider');
  private baseUrl: string;

  constructor() {
    super();
    this.baseUrl = CONFIG.musixmatch.address.replace(/\/$/, '');
  }

  @Cacheable({
    cacheKey: (args: any[]) => Object.values(ChartNamesEnum)[args[0]],
    hashKey: `:tracks:charts`,
    ttlSeconds: 3600, // 1 hour
  })
  public async getChartTracks(chartNameIndex: number): Promise<MusixmatchTrackSearchResponse[] | null> {
    let options: any = await this.getDefaultOptions();

    options.searchParams = {
      ...options.searchParams,
      page: 1,
      page_size: 100,
      f_has_lyrics: 1,
      chart_name: Object.values(ChartNamesEnum)[chartNameIndex]
    };

    this.logger.debug(`Requesting chart tracks`);
    return got.get<MusixmatchResponse>(`${this.baseUrl}/ws/1.1/chart.tracks.get`, options)
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
        this.logger.error(`Failed to request a chart tracks. Error: ${error?.status_code}`);

        throw new Error(mapErrorCode(error));
      }));
  }

  @Cacheable({
    cacheKey: (args: any[]) => args[0],
    hashKey: `:tracks`,
    ttlSeconds: 3600, // 1 hour
  })
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
        this.logger.error(`Failed to request a track snippet with trackId: ${trackId}. Error: ${error?.status_code}`);

        throw new Error(mapErrorCode(error));
      }));
  }
}