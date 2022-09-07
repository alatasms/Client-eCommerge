import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastrService:CustomToastrService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // const token: string = localStorage.getItem("accessToken");
    // //const decodeToken=this.jwtHelper.decodeToken(token);
    // //const expirationDate:Date=this.jwtHelper.getTokenExpirationDate(token);
    // let expired: boolean;

    // try {
    //   expired = this.jwtHelper.isTokenExpired(token);
     
    // } catch {
    //   expired = true;
    // }

    if (!_isAuthenticated) {
      this.toastrService.message("Oturum açmanız gerekiyor.","Yetkisiz erişim",{
        position:ToastrPosition.TopRight,
        toastrMessageType:ToastrMessageType.Warning
      })
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } })
    }

    return true;
  }

}
