import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { Create_User } from 'src/app/contracts/User/create_user';
import { Login_User_Response } from 'src/app/contracts/User/login_user_response';
import { Login_User } from 'src/app/entities/login_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private customToastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: () => void, errorCallBack?: (error:any) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "update-password"
    }, {
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    })

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value=>successCallBack()).catch(reason=>errorCallBack(reason));
    await promiseData;
  }

  async confirmEmail(userId:string, confirmationToken:string,successCallBack?:()=> void, errorCallBack?: (error:any)=>void){
    const observable : Observable<any> = this.httpClientService.post({
      controller:"users",
      action:"confirm-email"
    },{
      userId:userId,
      confirmationToken:confirmationToken
    })

    const promiseData: Promise<any> = firstValueFrom(observable);
    promiseData.then(value=>successCallBack()).catch(reason=>errorCallBack(reason));
    await promiseData;
  }
}
