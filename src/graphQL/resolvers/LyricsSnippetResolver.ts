import { Ctx, ObjectType, Query, Resolver } from 'type-graphql';
import { Request } from 'express';
import { EntityResponseFn } from '../responses/common/EntityResponseFn';
import { LyricsSnippet } from '../responses/LyricsSnippet';
import { Inject, ProvideAsSingleton } from '../../context/IocProvider';
import { MusixmatchServiceProvider } from '../../providers/MusixmatchServiceProvider';
import { ResponseMapper } from '../../utils/ResponseMapper';

@ObjectType()
class LyricsSnippetResponse extends EntityResponseFn(LyricsSnippet) { }

@Resolver(LyricsSnippet)
@ProvideAsSingleton(LyricsSnippetResolver)
export class LyricsSnippetResolver {

  constructor(@Inject(MusixmatchServiceProvider) private musixmatchServiceProvider: MusixmatchServiceProvider,) {
  }

  @Query(type => LyricsSnippetResponse)
  public async lyricsSnippet(@Ctx() request: Request) {
    return ResponseMapper.entityResponse<LyricsSnippet>(await this.musixmatchServiceProvider.getLyricsSnippet());
  }
}
