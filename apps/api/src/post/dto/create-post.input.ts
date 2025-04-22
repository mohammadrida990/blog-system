import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  thumbnail?: string;

  @IsString()
  @Field()
  content: string;

  @Field(() => [String])
  tags: string[];

  @IsBoolean()
  @Field(() => Boolean)
  published: boolean;
}
