import { Inject, ProvideAsSingleton } from "../context/IocProvider";
import { LoggerFactory } from "../context/components/LoggerFactory";
import { MusixmatchServiceProvider } from "../providers/MusixmatchServiceProvider";
import { LyricsSnippet } from "../graphQL/responses/LyricsSnippet";

@ProvideAsSingleton(LyricsSnippetService)
export class LyricsSnippetService {

  private logger: Logger = LoggerFactory.getLogger('LyricsSnippetService');

  constructor(@Inject(MusixmatchServiceProvider) private musixmatchServiceProvider: MusixmatchServiceProvider) {
  }


  public async getLyricsSnippet(): Promise<LyricsSnippet> {
    this.logger.debug(`Requesting random lyrics snippet`);

    const tracks = await this.musixmatchServiceProvider.getChartTracks(Math.floor(Math.random() * 4));

    const rightTrack = tracks[Math.floor(Math.random() * tracks.length)].track;
    const trackSnippet = await this.musixmatchServiceProvider.getTrackSnippet(rightTrack.track_id);

    let artistOptions: string[] = [rightTrack.artist_name];

    // Fill the artist options array with unique artists
    while (artistOptions.length < 3) {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)].track;
      if (!artistOptions.includes(randomTrack.artist_name)) {
        artistOptions = artistOptions.concat(randomTrack.artist_name);
      }
    }

    return {
      snippetBody: trackSnippet.snippet_body,
      rightArtist: rightTrack.artist_name,
      artistOptions: artistOptions.sort(() => Math.random() - 0.5) // Shuffle options
    };
  }

}
