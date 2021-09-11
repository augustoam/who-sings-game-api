import { Inject, ProvideAsSingleton } from "../context/IocProvider";

import { LoggerFactory } from "../context/components/LoggerFactory";
import { PlayerScoreRepository } from "../models/mongo/PlayerScoreRepository";
import { SavePlayerScoreArgs } from "../graphQL/args/SavePlayerScoreArgs";
import { PlayerScoreModel } from "../models/mongo/po/PlayerScore";

@ProvideAsSingleton(PlayerScoreService)
export class PlayerScoreService {

  private logger: Logger = LoggerFactory.getLogger('PlayerScoreService');

  constructor(@Inject(PlayerScoreRepository) private playerScoreRepository: PlayerScoreRepository) {
  }

  public async savePlayerScore(savePlayerScoreArgs: SavePlayerScoreArgs): Promise<PlayerScoreModel> {
    this.logger.debug(`Saving new score for '${savePlayerScoreArgs.playerName} player.'`);

    return this.playerScoreRepository.insert(savePlayerScoreArgs);
  }

  public async playerHighScores(playerName: string): Promise<PlayerScoreModel[]> {
    this.logger.debug(`Getting the high scores from '${playerName} player.'`);

    return this.playerScoreRepository.playerHighScores(playerName);
  }

  public async playersLeaderBoard(): Promise<PlayerScoreModel[]> {
    this.logger.debug(`Getting the players leader board.'`);

    return this.playerScoreRepository.playersLeaderBoard();
  }

}
