export interface AuthService{
    login(data:LoginData):Promise<User>
}