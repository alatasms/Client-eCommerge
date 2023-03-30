import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private alertifyService: AlertifyService,
    private activatedRout: ActivatedRoute,
    private router:Router) { }


  state: any = false;
  ngOnInit(): void {
    this.activatedRout.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const confirmationToken: string = params["confirmationToken"];
        this.state = await this.userAuthService.verifyConfirmationToken(confirmationToken, userId, () => {
        })
      }
    })
  }

  confirmEmail() {
      this.activatedRout.params.subscribe({
        next:async params=>{
          const userId: string = params["userId"];
        const confirmationToken: string = params["confirmationToken"];
        this.state = await this.userService.confirmEmail(userId,confirmationToken,
          ()=>{
            this.alertifyService.message("Mail başarıyla doğrulandı",{
              messageType:MessageType.Success,
              position:Position.TopRight
            })
            this.router.navigate(["/login"])
          },
          error=>{
            console.log(error);
          }
          )
        }
      })
  }

}
