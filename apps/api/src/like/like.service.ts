import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async postLikeCount(postId: number) {
    return await this.prisma.like.count({
      where: {
        postId,
      },
    });
  }

  async userLikePost({ postId, userId }: { postId: number; userId: number }) {
    return !!(await this.prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    }));
  }

  async likePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      return !!(await this.prisma.like.create({
        data: {
          userId,
          postId,
        },
      }));
    } catch (error) {
      throw new BadRequestException('you have already like this post', error);
    }
  }

  async unLikePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      await this.prisma.like.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
