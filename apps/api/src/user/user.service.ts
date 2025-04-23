import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    const { password, ...user } = createUserInput;

    const checkEmailExist = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!checkEmailExist) {
      throw new UnauthorizedException('Email exists');
    }
    const hashedPassword = await hash(password);
    return await this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
