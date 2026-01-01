import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserUpdateDto } from "./dto/user.update.dto";
import { JwtAuthGuard } from "src/common/guards/jwt.auth.guard";
import { UserProfileResponseDto } from "./dto/user.profile.response.dto";
import { UserService } from "./user.service";
import { User } from "src/common/decarators/user.decarator";
import type { UserEntity } from "./entities/user.entity";
import { UserMapper } from "src/common/mappers/user.mapper";
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMe(@User() user: UserEntity): Promise<UserProfileResponseDto> {
        return UserMapper.toUserProfileDto(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async get(@Param('id') id: string): Promise<UserProfileResponseDto> {
        const user = await this.userService.getUserById(id)
        return UserMapper.toUserProfileDto(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Body() userUpdateDto: UserUpdateDto, @User() user: UserEntity): Promise<UserProfileResponseDto> {
        const updatedUser = await this.userService.update(user.id, userUpdateDto)
        return UserMapper.toUserProfileDto(updatedUser)
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async delete(@User() user: UserEntity): Promise<boolean> {
        const isDeleted = await this.userService.delete(user.id);
        return isDeleted
    }
}