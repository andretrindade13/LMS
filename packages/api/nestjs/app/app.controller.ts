import 'reflect-metadata'
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from '../../src/services/user.service';

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
  async createUser(@Body() body: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.service.registerUser(body);
  }
}