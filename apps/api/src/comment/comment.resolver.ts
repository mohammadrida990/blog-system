import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { DEFAULT_PAGE_SIZE } from 'src/const';
import { CreateCommentInput } from './dto/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentEntity], { name: 'postComments' })
  async getPostComments(
    @Args('postId', { type: () => Int! }) postId: number,
    @Args('take', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_PAGE_SIZE,
    })
    take: number,
    @Args('skip', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
    })
    skip: number,
  ) {
    return await this.commentService.findOnePost({ postId, take, skip });
  }

  @Query(() => Int, { name: 'postCommentsCount' })
  async postCommentsCount(
    @Args('postId', { type: () => Int! }) postId: number,
  ) {
    return await this.commentService.postCommentsCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity, { name: 'createPostComment' })
  async createPostComment(
    @Context() Context,
    @Args('createPostComment') createPostComment: CreateCommentInput,
  ) {
    const authorId = Context.req.user.id;
    return await this.commentService.createPostComment(
      createPostComment,
      authorId,
    );
  }
}
