type LoginData = {
    email:string,
    password:string,
}

type RegistrationData = {
    email:string,
    password:string,
    age:number,
    numberPhone:string,
    type:TypeLogin
    firstName:string,
    lastName:string
}

type LoginResponse = {
    userProfile:User
    accessToken:string,
    refreshToken:string
}

enum TypeLogin{

}

