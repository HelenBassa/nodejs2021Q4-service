import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { validate } from 'uuid';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { WithoutPassUserEntity } from './entities/without-pass-user.entity';
import { UserNotFoundException } from './errors/user-not-found.errors';
import { IsntUUIDException } from './errors/isnt-uuid.error';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
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
  findOne(@Param('id') id: string): Promise<UserEntity | undefined> {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }

    const user = this.usersService.findOne(id);

    if (user) {
      return user;
    }

    throw new UserNotFoundException(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }

    const updatedUser = this.usersService.update(id, updateUserDto);

    if (updatedUser) {
      return updatedUser;
    }

    throw new UserNotFoundException(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }

    const deletedUser = this.usersService.remove(id);

    if (deletedUser) {
      return deletedUser;
    }

    throw new UserNotFoundException(id);
  }
}
