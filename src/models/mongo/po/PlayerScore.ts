import * as Mongoose from "mongoose";

export interface PlayerScore {
  playerName: string;
  numberOfPlays: number;
  numberOfCorrectAnswers: number;
  correctAnswerRate: number;
  createdAt: string;
}

export interface PlayerScoreModel extends PlayerScore, Mongoose.Document { }

export const PlayerScoreSchema: Mongoose.Schema = new Mongoose.Schema({
  playerName: {
    type: "string",
    required: true
  },
  numberOfPlays: {
    type: 'number',
    required: true
  },
  numberOfCorrectAnswers: {
    type: 'number',
    required: true
  },
  correctAnswerRate: {
    type: 'number',
    required: true
  },
  createdAt: {
    type: 'date',
    required: true
  },
}, { collection: 'PlayerScores', timestamps: true });

PlayerScoreSchema.index({
  createdAt: -1,
  playerName: 1
});