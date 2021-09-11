declare type MusixmatchResponse = {
  message: {
    body: any;
    header: {
      status_code: number;
    };
  };
};

declare type MusixmatchTrackSearchResponse = {
  track: {
    track_id: number;
    artist_id: number;
    artist_name: string;
  };
};

declare type MusixmatchTrackSnippetResponse = {
  snippet_body: string;
};