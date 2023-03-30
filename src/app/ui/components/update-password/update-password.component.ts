import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private userAuthService: UserAuthService,
    private activatedRout: ActivatedRoute,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router) { }


  state: any = false;

  ngOnInit(): void {
    this.activatedRout.params.subscribe({
      next: async params => {
        const userId:string = params["userId"];
        const resetToken:string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
        })
      }
    })
  }

  async updatePassword(password: string, passwordConfirm: string) {
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreler eşleşmiyor", {
        messageType: MessageType.Warning,
        position: Position.TopRight
      });
      return;
    }

    this.activatedRout.params.subscribe({
      next: async params => {
        const userId:string = params["userId"];
        const resetToken:string = params["resetToken"];
        this.state = await this.userService.updatePassword(userId,resetToken,password,passwordConfirm,
        ()=>{
          this.alertifyService.message("Şifre başarıyla güncellenmiştir.", {
            messageType: MessageType.Success,
            position: Position.TopRight
          })
          this.router.navigate(["/login"])
        },
        error=>{
          console.log(error);
        })
      }
    })
  }

}
