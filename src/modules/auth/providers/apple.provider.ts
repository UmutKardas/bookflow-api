import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "../dto/auth.login.dto";
import { AuthRegisterDto } from "../dto/auth.register.dto";
import { BaseAuthProvider } from "./base.auth.provider";
import { AuthResponseDto } from "../dto/auth.response.dto";

@Injectable()
export class AppleProvider extends BaseAuthProvider {
    validateRegister(data: AuthRegisterDto): Promise<AuthResponseDto> {
        throw new Error("Method not implemented.");
    }
    validateLogin(data: AuthLoginDto): Promise<AuthResponseDto> {
        throw new Error("Method not implemented.");
    }



}