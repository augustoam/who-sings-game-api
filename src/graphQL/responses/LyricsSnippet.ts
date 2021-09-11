import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LyricsSnippet {
  @Field(type => String, { nullable: false })
  public snippetBody: string;

  @Field(type => [String], { nullable: false })
  public artistOptions: string[];

  @Field(type => String, { nullable: false })
  public rightArtist: string;
}
