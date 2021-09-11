import { model } from "mongoose";
import { ProvideAsSingleton } from "../../context/IocProvider";
import { SavePlayerScoreArgs } from "../../graphQL/args/SavePlayerScoreArgs";
import { BaseRepository } from "./BaseRepository";
import { PlayerScoreModel, PlayerScoreSchema } from "./po/PlayerScore";

@ProvideAsSingleton(PlayerScoreRepository)
export class PlayerScoreRepository extends BaseRepository<PlayerScoreModel>{

  constructor() {
    super();
    this.registerModel(model<PlayerScoreModel>("PlayerScore", PlayerScoreSchema));
  }

  public insert(savePlayerScoreArgs: SavePlayerScoreArgs): Promise<PlayerScoreModel> {
    let insertObject: any = {
      playerName: savePlayerScoreArgs.playerName,
      numberOfPlays: savePlayerScoreArgs.numberOfPlays,
      numberOfCorrectAnswers: savePlayerScoreArgs.numberOfCorrectAnswers,
      correctAnswerRate: savePlayerScoreArgs.numberOfPlays / savePlayerScoreArgs.numberOfCorrectAnswers,
      createdAt: new Date()
    };

    return this.model.create(insertObject);
  }

  public playerHighScores(playerName: string): Promise<PlayerScoreModel[]> {
    return this.model
      .find({ "playerName": playerName })
      .sort({ "correctAnswerRate": 1, "createdAt": -1 })
      .limit(3)
      .exec();
  }

  public playersLeaderBoard(): Promise<PlayerScoreModel[]> {
    return this.model.aggregate([
      {
        $group: {
          _id: "$playerName",
          playerName: { $last: "$playerName" },
          createdAt: { $last: "$createdAt" },
          numberOfPlays: { $sum: "$numberOfPlays" },
          numberOfCorrectAnswers: { $sum: "$numberOfCorrectAnswers" },
          correctAnswerRate: { $sum: "$correctAnswerRate" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          playerName: 1,
          createdAt: 1,
          numberOfPlays: 1,
          numberOfCorrectAnswers: 1,
          correctAnswerRate: { $divide: ["$correctAnswerRate", "$count"] }
        }
      },
      { $sort: { "numberOfCorrectAnswers": -1, "correctAnswerRate": 1, "createdAt": -1 } },
      { $limit: 10 }
    ]).exec();
  }

}