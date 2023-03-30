import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error=>{
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
            toastrMessageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomFullWidth
          });

          this.userAuthService.refreshToken(localStorage.getItem("refreshToken")).then(data =>{});
          break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
              toastrMessageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
              toastrMessageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
              toastrMessageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
            break;
          default:
            this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
              toastrMessageType: ToastrMessageType.Warning,
              position: ToastrPosition.BottomFullWidth
            });
          break;
      }
      return of(error);
    }),shareReplay())
  }
  
  
}
