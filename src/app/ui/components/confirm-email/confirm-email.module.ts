import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"", component:ConfirmEmailComponent}
    ])
  ]
})
export class ConfirmEmailModule { }
