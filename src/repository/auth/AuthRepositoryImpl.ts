import {AuthRepository} from "@/repository/AuthRepository";


class AuthRepositoryImpl implements AuthRepository{
    login(data: LoginData): User {
        throw new Error("Method not implemented.");
    }

}


export const authRepository = new AuthRepositoryImpl()