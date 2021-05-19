import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginApiService } from '../login-api.service';
import { RegisterService } from '../../register/register.service';
import { LoginModel } from 'src/app/modal/loginModel';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myLoginForm: FormGroup;
  loginInfo: Object;
  loading = false;
  submitted = false;
  showErrorMessage = false;
  returnUrl: string;
  loginModal : LoginModel
  @ViewChild('userName') userName:ElementRef;
  @ViewChild('password') password:ElementRef;
  @ViewChild('anchorClick') anchorClick:ElementRef;
  showLoader = false;

  constructor(private loginApiService: LoginApiService,private registerService: RegisterService, private router: Router, private route: ActivatedRoute,private modalService: NgbModal) { }
  

  ngOnInit(): void {
    console.log("HELLO in login method init");
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.myLoginForm = new FormGroup({
      userName: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  ngAfterViewInit(){
    this.anchorClick.nativeElement.click();
  }
  
  open(content){
    let checkUser = localStorage.getItem('checkUser');
    if (checkUser === "true") {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true});
      localStorage.removeItem("checkUser");
    }  
  }

  close(){
    this.modalService.dismissAll();
  }

  loginMethod(form: FormGroup) {
    //event.preventDefault(); // -- use this to stop the page to reload without calling the api
    this.showLoader = true;
    this.loading = true;
    this.submitted = true;
    if (form.valid) {
      this.loginApiService.getLoginDetails(form.value.userName, form.value.password).subscribe((data) => {
        this.loginInfo = data;
        if (data['token'] !== undefined) {
          localStorage.setItem('token', data['token']);
          this.router.navigate(["/dashboard"]);
        } else {
          //this.router.navigate(["/login"]);
          this.showErrorMessage = true;
          //this.ngOnInit();
        }
        this.showLoader = false;
      });
    }else{
      this.showLoader = false;
    }
  }


}
