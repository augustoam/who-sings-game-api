import { ObjectType, Field, Int } from "type-graphql";
import { DateTimeScalar } from "./common/DateTimeScalarType";

@ObjectType()
export class PlayerScore {
  @Field(type => String, { nullable: false })
  public playerName: string;

  @Field(type => Int, { nullable: false })
  public numberOfPlays: number;

  @Field(type => Int, { nullable: false })
  public numberOfCorrectAnswers: number;

  @Field(type => DateTimeScalar, { nullable: false })
  public createdAt: string;

}
