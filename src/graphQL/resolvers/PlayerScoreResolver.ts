import { Arg, Args, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { EntityResponseFn } from '../responses/common/EntityResponseFn';
import { Inject, ProvideAsSingleton } from '../../context/IocProvider';
import { ResponseMapper } from '../../utils/ResponseMapper';
import { SavePlayerScoreArgs } from '../args/SavePlayerScoreArgs';
import { PlayerScore } from '../responses/PlayerScore';
import { PlayerScoreService } from '../../services/PlayerScoreService';
import { ArrayResponseFn } from '../responses/common/ArrayResponseFn';

@ObjectType()
class PlayerScoreResponse extends EntityResponseFn(PlayerScore) { }

@ObjectType()
class PlayerHighScoresArrayResponse extends ArrayResponseFn(PlayerScore) { }

@Resolver(PlayerScore)
@ProvideAsSingleton(PlayerScoreResolver)
export class PlayerScoreResolver {

  constructor(@Inject(PlayerScoreService) private playerScoreService: PlayerScoreService,) {
  }

  @Query(type => PlayerHighScoresArrayResponse)
  public async playerHighScores(
    @Arg("playerName", type => String, { nullable: false }) playerName: string,
  ) {
    return ResponseMapper.arrayResponse(await this.playerScoreService.playerHighScores(playerName));
  }

  @Query(type => PlayerHighScoresArrayResponse)
  public async playersLeaderBoard() {
    return ResponseMapper.arrayResponse(await this.playerScoreService.playersLeaderBoard());
  }

  @Mutation(type => PlayerScoreResponse)
  public async savePlayerScore(
    @Args({ validate: true }) savePlayerScoreArgs: SavePlayerScoreArgs,
  ) {
    return ResponseMapper.entityResponse<PlayerScore>(await this.playerScoreService.savePlayerScore(savePlayerScoreArgs));
  }
}
