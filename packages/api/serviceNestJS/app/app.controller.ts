import 'reflect-metadata'
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserService } from '../../core/src/services/user.service';
import { error } from 'console';

type UserType = "student" | "teacher";
type User = {
        id: string;
        email: string;
        password: string;
        typeUser: UserType;
        createdAt: Date;
        updatedAt: Date;        
    }
@Controller('users')
export class AppController {
  constructor(private readonly service: UserService) {}

  @Post('/register')
  async createUser(
    @Body() body: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    const result = await this.service.registerUser(body);
    return { ok: result.ok, error: result.error || null }
  }
}