import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class SavePlayerScoreArgs {
  @Field(type => String, { nullable: false })
  public playerName: string;

  @Field(type => Int, { nullable: false })
  public numberOfPlays: number;

  @Field(type => Int, { nullable: false })
  public numberOfCorrectAnswers: number;
}
