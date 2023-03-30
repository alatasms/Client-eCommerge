import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  constructor(private userAuthService:UserAuthService, private alertifyService:AlertifyService) { }

  passwordReset(email:string){
    this.userAuthService.passwordReset(email);
    this.alertifyService.message("Şifre yenileme maili gönderildi.",{
      messageType:MessageType.Success,
      position:Position.TopRight
    })
  }

  ngOnInit(): void {
  }

}
