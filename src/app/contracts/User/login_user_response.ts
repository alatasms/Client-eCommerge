import { Token } from "../token/token";

export class Login_User_Response{
    message:string;
    isSucceeded:boolean;
    accessToken:Token;
}