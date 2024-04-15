// user.service.ts
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICommonResponseProps } from 'types/response';
import { helperResponse } from 'utils/response';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async findAll(): Promise<ICommonResponseProps> {
    try {
      const users = await this.prisma.user.findMany();
      return helperResponse({
        isSuccess: true,
        data: users,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<ICommonResponseProps> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return helperResponse({
        isSuccess: true,
        data: user,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw error;
    }
  }

  async create(data: {
    email: string;
    name?: string;
  }): Promise<ICommonResponseProps> {
    try {
      const user = await this.prisma.user.create({
        data,
      });
      if (!user) {
        throw new BadRequestException('Fail to create user');
      }
      return helperResponse({
        isSuccess: true,
        message: 'User created successfully',
        data: user,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    data: { name?: string },
  ): Promise<ICommonResponseProps> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return helperResponse({
        isSuccess: true,
        data: user,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<ICommonResponseProps> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return helperResponse({
        isSuccess: true,
        data: user,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      throw error;
    }
  }
}
