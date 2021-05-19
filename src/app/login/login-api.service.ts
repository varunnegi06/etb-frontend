import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  API_KEY = 'TOKEN';
  constructor(private httpClient: HttpClient) { }

  public getLoginDetails(userName,password){
    return this.httpClient.post(`https://`+environment.apiUrl+`/api/loginpost`,{
      "userName": userName,
      "password": password
  });
  }

  loggedIn () {
    return !!localStorage.getItem('token');
  }
}
