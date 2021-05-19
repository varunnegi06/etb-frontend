import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotService } from '../forgot-api.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  resetForm: FormGroup;
  showErrorMessage: boolean;
  passwordValidation = false;
  submitted = false;
  showLoader = false;

  constructor(private forgotService: ForgotService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log("this.forgotService.getEmail() " + this.forgotService.getEmail());
    this.resetForm = new FormGroup({
      verifyCode: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('')
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  resetPassword(form: FormGroup) {
    event.preventDefault();
    this.showLoader = true;
    console.log("form " + form.valid)
    if (form.valid) {
      console.log(form.value.verifyCode);
      this.submitted = true;
      if (this.forgotService.getEmail() === "") {
        alert("Email not found");
        this.showLoader = false;
        this.router.navigate(["forgot/step/1"]);
      }
      else {
        this.forgotService.resetApi(form.value.verifyCode, form.value.newPassword).subscribe((data: { message: string }) => {
          console.log("data " + JSON.stringify(data));
          this.showLoader = false;
          if (data.message === "Success") {
            this.forgotService.setEmail("");
            alert("Password changed successfully.")
            this.router.navigate(["/login"]);
          } else {
            this.resetForm.reset();
            this.showErrorMessage = true;
          }
        });

      }
    }
  }

}
