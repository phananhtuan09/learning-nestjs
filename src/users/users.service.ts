// user.service.ts
import {
  Injectable,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { helperResponse } from 'utils/response';
import { ICommonResponseProps } from 'types/response';
import { DEFAULT_ERROR_MESSAGE } from 'constants/response';

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
      return helperResponse({
        statusCode: 500,
        message: DEFAULT_ERROR_MESSAGE,
      });
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
      return helperResponse({
        isSuccess: true,
        message: 'User created successfully',
        data: user,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      return helperResponse({
        statusCode: 500,
        message: DEFAULT_ERROR_MESSAGE,
      });
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
      return helperResponse({
        isSuccess: true,
        data: user,
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      return helperResponse({
        statusCode: 500,
        message: DEFAULT_ERROR_MESSAGE,
      });
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
      return helperResponse({
        statusCode: 500,
        message: DEFAULT_ERROR_MESSAGE,
      });
    }
  }
}
