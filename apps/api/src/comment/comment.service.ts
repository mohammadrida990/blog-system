import { Injectable } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'src/const';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async findOnePost({
    postId,
    take,
    skip,
  }: {
    postId: number;
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: take ?? DEFAULT_PAGE_SIZE,
      skip: skip ?? 0,
    });
  }

  async postCommentsCount(postId: number) {
    return await this.prisma.comment.count({
      where: {
        postId,
      },
    });
  }

  async createPostComment(
    createPostComment: CreateCommentInput,
    authorId: number,
  ) {
    return await this.prisma.comment.create({
      data: {
        content: createPostComment.content,
        post: {
          connect: {
            id: createPostComment.postId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }
}
