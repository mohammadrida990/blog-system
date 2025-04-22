import { Field, InputType } from '@nestjs/graphql';
import { IsString, Min, MinLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  email: string;

  @Field()
  @MinLength(1)
  @IsString()
  password: string;
}
