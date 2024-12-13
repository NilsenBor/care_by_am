import {AuthService} from "@/services/auth/AuthService";
import {AuthRepository} from "@/repository/AuthRepository";
import {authRepository} from "@/repository/auth";


class AuthServiceImpl implements AuthService{
    constructor(private repository:AuthRepository) {
    }


    login(data:LoginData):Promise<LoginResponse>{
        throw new Error('eee')
    }
}

export const authService = new AuthServiceImpl(authRepository)