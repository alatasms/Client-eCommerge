import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Login_User_Response } from 'src/app/contracts/User/login_user_response';
import { Login_User } from 'src/app/entities/login_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private customToastrService:CustomToastrService) 
  { }

  async googleLogin(user:SocialUser, successCallBack?: () => void){
    const observable: Observable<SocialUser | Login_User_Response>= this.httpClientService.post<SocialUser | Login_User_Response>({
      action:"google-login",
      controller:"auth"
    },user)
    const response: Login_User_Response= await firstValueFrom(observable) as Login_User_Response;
    if (response) {
      localStorage.setItem("accessToken",response.accessToken.token);
      this.customToastrService.message(response.message,"Giriş Başarılı",{
        position:ToastrPosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
      })
    }
    successCallBack();
  }


  async login(loginUser:Login_User, successCallBack?: () => void) {
   const observable:Observable<Login_User | Login_User_Response> = this.httpClientService.post<Login_User | Login_User_Response>({controller:"auth",action:"login"},loginUser);
   const response: Login_User_Response = await firstValueFrom(observable) as Login_User_Response;
    if (response) {
      localStorage.setItem("accessToken",response.accessToken.token);
      this.customToastrService.message(response.message,"Giriş Başarılı",{
        toastrMessageType:ToastrMessageType.Success,
        position:ToastrPosition.TopRight
      })
    }
    successCallBack();
  }

  async facebookLogin(user:SocialUser, successCallBack?:()=>void){
    const observable: Observable<SocialUser | Login_User_Response> = this.httpClientService.post<SocialUser | Login_User_Response>({
      controller:"auth",action:"facebook-login"
    },user)

    const response:Login_User_Response=await firstValueFrom(observable) as Login_User_Response;
    if (response) {
      if (response.accessToken.token!=null) {
        localStorage.setItem("accessToken",response.accessToken.token);
        this.customToastrService.message(response.message,"Giriş Başarılı",{
        position:ToastrPosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
      })
      }
    }

    successCallBack();
  }
}
