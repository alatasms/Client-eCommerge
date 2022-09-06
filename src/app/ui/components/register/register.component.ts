import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/User/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserService, private toastrService:CustomToastrService) { }

  frm:FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      firstName:["",[Validators.required,
        Validators.maxLength(50)]],
      lastName:["",[Validators.required,
        Validators.maxLength(50)]],
      username:["",[Validators.required,
        Validators.maxLength(50)]],
      email:["",[Validators.required,
        Validators.maxLength(250)]],
      password:["",[Validators.required]],
      passwordConfirm:["",[Validators.required]]
    })
  }


//get ile property tanımlanır.
  get component(){
    return this.frm.controls;
  }

  submitted:boolean=false;
  message:string="";

  async onSubmit(user:User){
    this.submitted=true;
    //this.displayMessages(this.frm);
    if (this.frm.invalid)
      return;

      const result:Create_User = await this.userService.create(user)
      if (result.issucceeded) 
        this.toastrService.message(result.message,"Başarılı",{
          toastrMessageType:ToastrMessageType.Success,
          position:ToastrPosition.TopRight
        })
      else
      this.toastrService.message(result.message, "Hata",{
        toastrMessageType:ToastrMessageType.Error,
        position:ToastrPosition.TopRight
      })
  }

  //todo
  displayMessages(frmm:FormGroup){
    if(frmm.controls['name'].errors.required ){
      this.message="İsim alanı boş geçilmemelidir."
    }
    if (frmm.controls['name'].errors.maxlength) {
      this.message="İsim maximum 50 karakter uzunluğunda olabilir."
    }
  }

}


  