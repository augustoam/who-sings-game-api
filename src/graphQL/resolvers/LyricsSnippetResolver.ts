import { ObjectType, Query, Resolver } from 'type-graphql';
import { EntityResponseFn } from '../responses/common/EntityResponseFn';
import { LyricsSnippet } from '../responses/LyricsSnippet';
import { Inject, ProvideAsSingleton } from '../../context/IocProvider';
import { ResponseMapper } from '../../utils/ResponseMapper';
import { LyricsSnippetService } from '../../services/LyricsSnippetService';

@ObjectType()
class LyricsSnippetResponse extends EntityResponseFn(LyricsSnippet) { }

@Resolver(LyricsSnippet)
@ProvideAsSingleton(LyricsSnippetResolver)
export class LyricsSnippetResolver {

  constructor(@Inject(LyricsSnippetService) private lyricsSnippetService: LyricsSnippetService) {
  }

  @Query(type => LyricsSnippetResponse)
  public async lyricsSnippet() {
    return ResponseMapper.entityResponse<LyricsSnippet>(await this.lyricsSnippetService.getLyricsSnippet());
  }
}
