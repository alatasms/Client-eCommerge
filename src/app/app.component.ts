import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrOptions, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private toastrService: CustomToastrService, public authService: AuthService, private router: Router, private socialAuthService: SocialAuthService ) {
    authService.identityCheck();

    //toastr.message("Merhaba","Musa Alatas",{position:Position.TopFullWidth, toastrMessageType:ToastrMessageType.Warning});
  }

  SignOut() {
    localStorage.removeItem("accessToken");
    this.socialAuthService.signOut();
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum kapatıldı", "Kapatılıyor", {
      position: ToastrPosition.TopRight,
      toastrMessageType: ToastrMessageType.Info
    });
  }
}
