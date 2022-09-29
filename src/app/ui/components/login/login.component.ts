import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login_User_Response } from 'src/app/contracts/User/login_user_response';
import { Login_User } from 'src/app/entities/login_user';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userAuthService:UserAuthService, private authService:AuthService, private activatedRoute:ActivatedRoute, private router:Router, private socialAuthService: SocialAuthService) {
    this.socialAuthService.authState.subscribe(async (user:SocialUser)=>{
      switch (user.provider) {
        case "GOOGLE":
          await this.googleLogin(user);
          break;
        case "FACEBOOK":
          await this.facebookLogin(user);
          break;
        default:
          break;
      }
    })
   }

  ngOnInit(): void {
    
  }

  async facebookLogin(user: SocialUser){
    await this.userAuthService.facebookLogin(user,()=>{
      this.authService.identityCheck();
    })

  }

  facebookLoginScreen(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  async googleLogin(user:SocialUser){
    await this.userAuthService.googleLogin(user,()=>{
      this.authService.identityCheck();
    })
    
  }


  async login(usernameOrEmail:string, password:string){
    const loginUser = new Login_User;
    loginUser.password=password;
    loginUser.usernameOrEmail=usernameOrEmail;
    await this.userAuthService.login(loginUser, ()=>{
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      })

    })
      
  }
}
