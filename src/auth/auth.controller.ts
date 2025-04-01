import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @Post('register')
    async register(@Body() body: { email: string; username: string; password: string }): Promise<User> {
        return this.usersService.createUser(body.email, body.username, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }): Promise<{ access_token: string }> {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }
}
