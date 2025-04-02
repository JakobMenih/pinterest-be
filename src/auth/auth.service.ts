import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any): Promise<{ access_token: string }> {
        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
        };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
}
