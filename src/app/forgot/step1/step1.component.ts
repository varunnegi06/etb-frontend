import { ActivatedRoute, Router } from '@angular/router';
import { ForgotService } from './../forgot-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  forgotForm: FormGroup;
  showErrorMessage: boolean;
  submitted = false;
  showLoader = false;

  constructor(private forgotService: ForgotService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  sendCode(form: FormGroup) {
    event.preventDefault();
    //console.log("form " + form.valid)
    if (form.valid) {
      this.submitted = true;
      this.showLoader = true;
      this.forgotService.sendCode(form.value.email).subscribe((data: { message: string }) => {
        console.log("data " + JSON.stringify(data));
        if (data.message === "Success") {
          this.forgotService.setEmail(form.value.email);
          this.router.navigate(["forgot/step/2"]);
        } else {
          form.reset();
          Object.keys(form.controls).forEach(key => {
            form.get(key).setErrors(null) ;
          });
          this.showErrorMessage = true;
        }
        this.showLoader = false;
      });
    }
  }

}
