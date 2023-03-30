import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, shareReplay } from 'rxjs';
import { Login_User_Response } from 'src/app/contracts/User/login_user_response';
import { Login_User } from 'src/app/entities/login_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private customToastrService: CustomToastrService) { }

  async googleLogin(user: SocialUser, successCallBack?: () => void) {
    const observable: Observable<SocialUser | Login_User_Response> = this.httpClientService.post<SocialUser | Login_User_Response>({
      action: "google-login",
      controller: "auth"
    }, user).pipe(shareReplay())
    const response: Login_User_Response = await firstValueFrom(observable) as Login_User_Response;
    if (response) {
      localStorage.setItem("accessToken", response.accessToken.token);
      localStorage.setItem("refreshToken", response.accessToken.refreshToken);
      this.customToastrService.message(response.message, "Giriş Başarılı", {
        position: ToastrPosition.TopRight,
        toastrMessageType: ToastrMessageType.Success
      })
    }
    successCallBack();
  }


  async refreshToken(refreshToken: string, callBackFunciton?: () => void): Promise<any> {
    const observable: Observable<any | Login_User_Response> = this.httpClientService.post({
      action: "refreshtoken",
      controller: "auth"
    }, { refreshToken: refreshToken });

    const response: Login_User_Response = await firstValueFrom(observable) as Login_User_Response;

    if (response) {
      localStorage.setItem("accessToken", response.accessToken.token);
      localStorage.setItem("refreshToken", response.accessToken.refreshToken);
    }
    callBackFunciton();
  }


  async login(loginUser: Login_User, successCallBack?: () => void) {
    const observable: Observable<Login_User | Login_User_Response> = this.httpClientService.post<Login_User | Login_User_Response>({ controller: "auth", action: "login" }, loginUser).pipe(shareReplay());
    const response: Login_User_Response = await firstValueFrom(observable) as Login_User_Response;
    if (response.isSucceeded) {
      localStorage.setItem("accessToken", response.accessToken.token);
      localStorage.setItem("refreshToken", response.accessToken.refreshToken);   

      this.customToastrService.message(response.message, "Giriş Başarılı", {
        toastrMessageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
   
    }
    else {
      this.customToastrService.message(response.message, "Giriş Başarısız",{
        toastrMessageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }
    successCallBack();
  }

  async facebookLogin(user: SocialUser, successCallBack?: () => void) {
    const observable: Observable<SocialUser | Login_User_Response> = this.httpClientService.post<SocialUser | Login_User_Response>({
      controller: "auth", action: "facebook-login"
    }, user)

    const response: Login_User_Response = await firstValueFrom(observable) as Login_User_Response;
    if (response) {
      if (response.accessToken.token != null) {
        localStorage.setItem("accessToken", response.accessToken.token);
        localStorage.setItem("refreshToken", response.accessToken.refreshToken);
        this.customToastrService.message(response.message, "Giriş Başarılı", {
          position: ToastrPosition.TopRight,
          toastrMessageType: ToastrMessageType.Success
        })
      }
    }

    successCallBack();
  }

  async passwordReset(email: string, callBackFunciton?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "password-reset"
    }, { email: email })

    await firstValueFrom(observable);
    callBackFunciton();
  }

  async verifyResetToken(resetToken: string, userId: string, callBackFunciton?: () => void) :Promise<boolean> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "verify-reset-token"
    }, {
      resetToken: resetToken,
      userId: userId
    })
    const state:boolean=await firstValueFrom(observable); //api'den gelen state değerini bu şekilde karşılıyoruz.
    callBackFunciton();
    return state;
  }



  async confirmEmail(email: string, callBackFunciton?: () => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "auth",
      action: "email-confirm"
    }, { email: email })

    await firstValueFrom(observable);
    callBackFunciton();
  }

  async verifyConfirmationToken(confirmationToken:string, userId:string,callBackFunciton?:()=>void) : Promise<boolean>{
    const observable : Observable<any> = this.httpClientService.post({
      controller:"auth",
      action:"verify-confirm-token"
    },{
      confirmationToken:confirmationToken,
      userId:userId
    })

    const state:boolean = await firstValueFrom(observable);
    callBackFunciton();
    return state;
  }

 
}
