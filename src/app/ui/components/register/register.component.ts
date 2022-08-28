import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  frm:FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name:["",[Validators.required,
        Validators.maxLength(50)]],
      surname:["",[Validators.required,
        Validators.maxLength(50)]],
      username:["",[Validators.required,
        Validators.maxLength(50)]],
      email:["",[Validators.required,
        Validators.maxLength(250)]],
      password:["",[Validators.required]],
      passwordAgain:["",[Validators.required]]
    })
  }


//get ile property tanımlanır.
  get component(){
    return this.frm.controls;
  }

  submitted:boolean=false;
  message:string="";

  onSubmit(data:any){
    this.submitted=true;
    this.displayMessages(this.frm);
  }

  //todo
  displayMessages(frmm:FormGroup){
    if(frmm.controls['name'].errors.required ){
      this.message="İsim alanı boş geçilmemelidir."
    }
    if (frmm.controls['name'].errors.maxlength) {
      this.message="İsim maximum 50 karakter uzunluğunda olabilir."
    }
  var messagea=this.message;
    debugger;
  }

}


  