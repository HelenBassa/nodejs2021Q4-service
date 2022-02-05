import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpCode,
} from '@nestjs/common';
import { validate } from 'uuid';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './errors/user-not-found.errors';
import { IsntUUIDException } from './errors/isnt-uuid.error';
import { AuthGuard } from '../auth/auth.guard';
import { TasksService } from '../tasks/tasks.service';
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {
    (async () => {
      await this.usersService.addAdmin();
    })();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }

    const user = this.usersService.findOne(id);

    if (user) {
      return user;
    }

    throw new UserNotFoundException(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }

    await this.usersService.remove(id);

    await this.tasksService.unassignUser(id);
  }
}
