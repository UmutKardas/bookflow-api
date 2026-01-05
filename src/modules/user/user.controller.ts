import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UserUpdateDto } from "./dto/user.update.dto";
import { UserProfileResponseDto } from "./dto/user.profile.response.dto";
import { UserService } from "./user.service";
import { User } from "src/common/decarators/user.decarator";
import type { UserEntity } from "./entities/user.entity";
import { UserMapper } from "src/common/mappers/user.mapper";
import { AppException } from "src/common/exceptions/app.exception";
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getMe(@User() user: UserEntity): Promise<UserProfileResponseDto> {
        return UserMapper.toUserProfileDto(user)
    }

    @Get('/:id')
    async get(@Param('id') id: string): Promise<UserProfileResponseDto> {
        const user = await this.userService.getUniqueUser({ id: id })
        if (!user) {
            throw new AppException(`User with id ${id} not found`);
        }
        return UserMapper.toUserProfileDto(user)
    }

    @Post('update')
    async update(@Body() userUpdateDto: UserUpdateDto, @User() user: UserEntity): Promise<UserProfileResponseDto> {
        const updatedUser = await this.userService.update(user.id, userUpdateDto)
        return UserMapper.toUserProfileDto(updatedUser)
    }

    @Post('delete')
    async delete(@User() user: UserEntity): Promise<boolean> {
        const isDeleted = await this.userService.delete(user.id);
        return isDeleted
    }
}