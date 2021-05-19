import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerJson = {};
  responseJson = {};
  alreadyExists= false;

  constructor(private httpClient: HttpClient) { };

  getRegisterJson(): {} {
    return this.registerJson;
  }

  setAlreadyExists(alreadyExists) {
    this.alreadyExists = alreadyExists;
  }

  getAlreadyExists(): {} {
    return this.alreadyExists;
  }

  setRegisterJson(registerJson : boolean) {
    this.registerJson = registerJson;
  }

  checkUser(userDetailsJson) {
    return this.httpClient.post(`https://`+environment.apiUrl+`/api/checkEmailExists`, userDetailsJson);
  }

  registerUserDetails(userDetailsJson) {
    return this.httpClient.post(`https://`+environment.apiUrl+`/api/register`, userDetailsJson);
  }

  paymentService(paymentJson) {
    return this.httpClient.post(`https://`+environment.apiUrl+`/api/processPayment`, paymentJson);
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}