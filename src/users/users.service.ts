import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({ where: { email } });
    }

    async createUser(email: string, username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ email, username, password: hashedPassword });
        return await this.usersRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updateUser(id: number, updateData: { email?: string; username?: string; password?: string }): Promise<User> {
        const user = await this.getUserById(id);
        if (updateData.email !== undefined) {
            user.email = updateData.email;
        }
        if (updateData.username !== undefined) {
            user.username = updateData.username;
        }
        if (updateData.password !== undefined) {
            user.password = await bcrypt.hash(updateData.password, 10);
        }
        return await this.usersRepository.save(user);
    }

    async deleteUser(id: number): Promise<any> {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }
}
