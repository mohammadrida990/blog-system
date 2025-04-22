import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Query(() => Int, { name: 'postLikeCount' })
  async postLikeCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.likeService.postLikeCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean, { name: 'userLikePost' })
  async userLikePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return this.likeService.userLikePost({ postId, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'likePost' })
  async likePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.likePost({ postId, userId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { name: 'unLikePost' })
  async unLikePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.likeService.unLikePost({ postId, userId });
  }
}
