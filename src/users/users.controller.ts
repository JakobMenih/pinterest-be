import {
    Controller,
    Get,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
    ParseIntPipe,
    UnauthorizedException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    // Return full profile information from the database
    @Get('profile')
    async getProfile(@Request() req: any) {
        return await this.usersService.getUserById(req.user.userId);
    }

    // List all users (consider restricting this in production)
    @Get()
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }

    // Get a single user by ID
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getUserById(id);
    }

    // Update user (only allow a user to update their own record)
    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: { email?: string; username?: string; password?: string },
        @Request() req: any
    ) {
        if (req.user.userId !== id) {
            throw new UnauthorizedException('You can only update your own account');
        }
        return await this.usersService.updateUser(id, updateData);
    }

    // Delete user (only allow a user to delete their own account)
    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: any
    ) {
        if (req.user.userId !== id) {
            throw new UnauthorizedException('You can only delete your own account');
        }
        return await this.usersService.deleteUser(id);
    }
}
