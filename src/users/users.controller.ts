import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { WithoutPassUserEntity } from './entities/without-pass-user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<WithoutPassUserEntity | false> {
    return this.usersService.create(createUserDto);
    // const data = request.body;
    // const createdUser = await usersRepo.create(data);
    // reply.code(HTTP_CODES.CREATED).send(createdUser);
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
    // const users = await usersRepo.getAll();
    // reply.code(HTTP_CODES.OK).send(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    const user = this.usersService.findOne(id);
    return user;
    // const { userId } = request.params;

    // if (!validate(userId)) {
    //   reply
    //     .code(HTTP_CODES.BAD_REQUEST)
    //     .send({ message: `This ID: ${userId} isn't UUID` });
    // }

    // const user = await usersRepo.getOne(userId);

    // if (user) {
    //   reply.code(HTTP_CODES.OK).send(user);
    // } else {
    //   reply
    //     .code(HTTP_CODES.NOT_FOUND)
    //     .send({ message: `User with ID: ${userId} doesn't exist` });
    // }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
    // const { userId } = request.params;
    // const data = request.body;

    // if (!validate(userId)) {
    //   reply
    //     .code(HTTP_CODES.BAD_REQUEST)
    //     .send({ message: `This ID: ${userId} isn't UUID` });
    // }

    // const updatedUser = await usersRepo.update(userId, data);

    // if (updatedUser) {
    //   reply.code(HTTP_CODES.OK).send(updatedUser);
    // } else {
    //   reply
    //     .code(HTTP_CODES.NOT_FOUND)
    //     .send({ message: `User with ID: ${userId} doesn't exist` });
    // }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
    // const { userId } = request.params;

    // if (!validate(userId)) {
    //   reply
    //     .code(HTTP_CODES.BAD_REQUEST)
    //     .send({ message: `This ID: ${userId} isn't UUID` });
    // }

    // const deletedUser = await usersRepo.deleteOne(userId);

    // if (deletedUser) {
    //   reply.code(HTTP_CODES.NO_CONTENT);
    // } else {
    //   reply
    //     .code(HTTP_CODES.NOT_FOUND)
    //     .send({ message: `User with ID: ${userId} doesn't exist` });
    // }
  }
}
