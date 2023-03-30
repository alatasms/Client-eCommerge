import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService, private signalRService:SignalRService, private alertify :AlertifyService) {
    signalRService.start(HubUrls.ProductHub);
   }

  ngOnInit(): void {
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 1000);


    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction,message=>{
      this.alertify.message(message,{
        messageType:MessageType.Message,
        position:Position.TopRight
      })
    })
  }

}
