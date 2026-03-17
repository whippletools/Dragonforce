import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private extractToken(authorization?: string) {
    if (!authorization?.startsWith('Bearer ')) {
      throw new BadRequestException('Authorization Bearer token requerido');
    }

    return authorization.replace('Bearer ', '').trim();
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.usersService.login(body.username, body.password);
  }

  @Get('me')
  async me(@Headers('authorization') authorization?: string) {
    const token = this.extractToken(authorization);
    const user = await this.usersService.findByToken(token);
    return this.usersService.findOne(user.id);
  }

  @Post('logout')
  logout(@Headers('authorization') authorization?: string) {
    const token = this.extractToken(authorization);
    return this.usersService.logout(token);
  }

  @Post()
  async create(@Headers('authorization') authorization: string | undefined, @Body() body: CreateUserDto) {
    await this.usersService.findByToken(this.extractToken(authorization));
    return this.usersService.create(body);
  }

  @Get()
  async findAll(@Headers('authorization') authorization: string | undefined) {
    await this.usersService.findByToken(this.extractToken(authorization));
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    await this.usersService.findByToken(this.extractToken(authorization));
    return this.usersService.update(+id, body);
  }

  @Patch(':id/password')
  async changePassword(
    @Headers('authorization') authorization: string | undefined,
    @Param('id') id: string,
    @Body() body: ChangePasswordDto,
  ) {
    await this.usersService.findByToken(this.extractToken(authorization));
    return this.usersService.changePassword(+id, body.newPassword);
  }

  @Delete(':id')
  async remove(@Headers('authorization') authorization: string | undefined, @Param('id') id: string) {
    await this.usersService.findByToken(this.extractToken(authorization));
    return this.usersService.remove(+id);
  }
}