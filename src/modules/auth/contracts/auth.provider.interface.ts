import { AuthLoginDto } from "../dto/auth.login.dto";
import { AuthRegisterDto } from "../dto/auth.register.dto";
import { AuthResponseDto } from "../dto/auth.response.dto";

export interface AuthProvider {
    validateRegister(data: AuthRegisterDto): Promise<AuthResponseDto>;
    validateLogin(data: AuthLoginDto): Promise<AuthResponseDto>;
}