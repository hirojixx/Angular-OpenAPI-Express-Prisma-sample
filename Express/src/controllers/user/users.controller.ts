import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { HttpException } from '../../utils/HttpException';
import { isEmpty } from '../../utils/util';
import { validationMiddleware } from '../../utils/validation.middleware';

import { CreateUser, ResponseUserApi } from './users.viewmodel';

@JsonController('/users')
export class UsersController {
  private user = new PrismaClient().user;

  @Get('/')
  @OpenAPI({ summary: 'Return a list of users' })
  @ResponseSchema(ResponseUserApi)
  async getUsers(): Promise<ResponseUserApi> {
    const findAllUsersData: User[] = await this.user.findMany();
    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'Return find a user' })
  @ResponseSchema(ResponseUserApi)
  async getUserById(@Param('id') userId: number): Promise<ResponseUserApi> {
    const findUser = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    return { data: [findUser], message: 'findOne' };
  }

  @Post('/')
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUser, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  @ResponseSchema(ResponseUserApi)
  async createUser(@Body() userData: CreateUser): Promise<ResponseUserApi> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User | null = await this.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const saveData = { name: userData.name, email: userData.email, password: hashedPassword };
    const saved = await this.user.create({
      data: saveData,
    });

    return { data: [saved], message: 'created' };
  }

  @Put('/:id')
  @OpenAPI({ summary: 'Update a user' })
  @ResponseSchema(ResponseUserApi)
  @UseBefore(validationMiddleware(CreateUser, 'body', true))
  async updateUser(@Param('id') userId: number, @Body() userData: CreateUser): Promise<ResponseUserApi> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User | null = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);

    await this.user.update({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
      where: {
        user_id: findUser.user_id,
      },
    });

    const updates = await this.user.findMany();
    return { data: updates, message: 'updated' };
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'Delete a user' })
  @ResponseSchema(ResponseUserApi)
  async deleteUser(@Param('id') userId: number): Promise<ResponseUserApi> {
    const findUser: User | null = await this.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!findUser) throw new HttpException(409, "You're not user");

    const deleteUserData: User = await this.user.delete({
      where: {
        user_id: userId,
      },
    });

    return { data: [deleteUserData], message: 'deleted' };
  }
}
