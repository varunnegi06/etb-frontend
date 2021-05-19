import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {RegisterService} from './../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  submitted = false; 

  constructor(private registerService:RegisterService,private router: Router) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      companyName: new FormControl('',Validators.required),
      ebayPage: new FormControl('',Validators.required),
      phoneNumber: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl('',[Validators.required])
    },
    {
      validators: this.registerService.matchPassword('password','confirmPassword')
    });
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    if (form.valid) {
      form.value['name']=form.value['firstName']+form.value['lastName'] 
      this.registerService.setRegisterJson(form.value);
      console.log(JSON.stringify(form.value));
      this.router.navigate(['/register/step2']);
    }
  }
 

}
