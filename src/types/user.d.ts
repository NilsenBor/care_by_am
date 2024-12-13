type User = {
    id:string,
    email:string,
    profilePhoto:string,
    firstName:string,
    lastName:string,
    age:number,
    profile:UserProfile
}

type UserProfile = {
    type:TypeUser
    settings:unknown
}

enum TypeUser{

}

