import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { generateSessionToken, hashPassword, verifyPassword } from './password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    void this.ensureDefaultAdmin();
  }

  private sanitize(user: User) {
    const { passwordHash, sessionToken, ...safeUser } = user;
    return safeUser;
  }

  private async ensureDefaultAdmin() {
    const count = await this.usersRepository.count();
    if (count > 0) {
      return;
    }

    const admin = this.usersRepository.create({
      username: 'admin',
      displayName: 'Administrador CMS',
      email: 'admin@dragonforce.local',
      passwordHash: hashPassword('dragon2026'),
      role: 'admin',
      isActive: true,
      sessionToken: null,
    });

    await this.usersRepository.save(admin);
  }

  async create(data: CreateUserDto) {
    const user = this.usersRepository.create({
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      passwordHash: hashPassword(data.password),
      role: data.role ?? 'editor',
      isActive: data.isActive ?? true,
      sessionToken: null,
    });

    const saved = await this.usersRepository.save(user);
    return this.sanitize(saved);
  }

  async findAll() {
    const users = await this.usersRepository.find({ order: { id: 'ASC' } });
    return users.map((user) => this.sanitize(user));
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitize(user);
  }

  async findByToken(token: string) {
    const user = await this.usersRepository.findOne({ where: { sessionToken: token } });
    if (!user || !user.isActive) {
      throw new NotFoundException('User session not found');
    }
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user || !user.isActive || !verifyPassword(password, user.passwordHash)) {
      throw new NotFoundException('Usuario o contraseña incorrectos');
    }

    user.sessionToken = generateSessionToken();
    const saved = await this.usersRepository.save(user);

    return {
      token: saved.sessionToken,
      user: this.sanitize(saved),
    };
  }

  async logout(token: string) {
    const user = await this.findByToken(token);
    user.sessionToken = null;
    await this.usersRepository.save(user);
    return { message: 'Sesión cerrada' };
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.username = data.username ?? user.username;
    user.displayName = data.displayName ?? user.displayName;
    user.email = data.email ?? user.email;
    user.role = data.role ?? user.role;
    user.isActive = data.isActive ?? user.isActive;

    if (data.password) {
      user.passwordHash = hashPassword(data.password);
    }

    const saved = await this.usersRepository.save(user);
    return this.sanitize(saved);
  }

  async changePassword(id: number, newPassword: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.passwordHash = hashPassword(newPassword);
    user.sessionToken = null;
    const saved = await this.usersRepository.save(user);
    return this.sanitize(saved);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { message: 'User deleted successfully' };
  }
}