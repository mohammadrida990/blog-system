import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/const';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    take = 0,
    skip = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async getUserPosts(userId: number) {
    return await this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
  }

  async getPostsCount(userId: number) {
    return await this.prisma.post.count({
      where: {
        authorId: userId,
      },
    });
  }

  async createPost({
    userId,
    createPostInput,
  }: {
    userId: number;
    createPostInput: CreatePostInput;
  }) {
    const { tags, ...postData } = createPostInput;
    return await this.prisma.post.create({
      data: {
        ...postData,
        author: {
          connect: {
            id: userId,
          },
        },
        tags: {
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
      include: {
        tags: true,
        author: true,
      },
    });
  }

  async updatePost({
    userId,
    updatePostInput,
  }: {
    userId: number;
    updatePostInput: UpdatePostInput;
  }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: updatePostInput.postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    const { postId, ...otherData } = updatePostInput;

    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...otherData,
        tags: {
          set: [],
          connectOrCreate: updatePostInput.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async deletePost({ postId, userId }: { postId: number; userId: number }) {
    const checkUserExist = await this.prisma.post.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    if (!checkUserExist) throw new UnauthorizedException();

    const result = await this.prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    return !!result;
  }
}
