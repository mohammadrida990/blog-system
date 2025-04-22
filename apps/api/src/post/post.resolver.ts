import { Resolver, Query, Context, Args, Int, Mutation } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  async findAll(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const user = context.req.user;
    console.log(user);
    return await this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'postCount' })
  async count() {
    return this.postService.count();
  }

  @Query(() => Post, { name: 'getPostById' })
  async getPostById(@Args('id', { type: () => Int }) id: number) {
    return await this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'getUserPosts' })
  async getUserPosts(@Context() context) {
    const userId = context.req.user.id;
    return await this.postService.getUserPosts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'getPostsCount' })
  async getPostsCount(@Context() context) {
    const userId = context.req.user.id;
    return await this.postService.getPostsCount(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Context() context,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    const userId = context.req.user.id;
    return await this.postService.createPost({ userId, createPostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async updatePost(
    @Context() context,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    const userId = context.req.user.id;
    return await this.postService.updatePost({ userId, updatePostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deletePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
  ) {
    const userId = context.req.user.id;
    return await this.postService.deletePost({ postId, userId });
  }
}
