import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  private email = "";

  constructor(private httpClient: HttpClient) { }

  public sendCode(email: string){
    return this.httpClient.post(`https://`+environment.apiUrl+`/api/forgot`,{
        "email":email
    });
  }
  

  public setEmail (email: string){
    this.email = email;
  }

  public getEmail (){
    return this.email;
  }

  public resetApi(verifyCode: number,newPassword: string){
    return this.httpClient.post(`https://`+environment.apiUrl+`/api/reset`,{
      "email":this.email,
      "otp":verifyCode,
      "password": newPassword
  });
  }
}
