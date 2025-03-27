import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { CreateUserDTO } from './create-user-dto';
import { LoginDTO } from './login-dto';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  async create(
    @Body()
    createUserDTO: CreateUserDTO,
  ) {
    return await this.usersService.signup(createUserDTO);
  }

  @Post('/login')
  async login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return await this.usersService.login(loginDTO);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.User)
  @Get('/profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
