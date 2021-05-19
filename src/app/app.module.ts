import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {RegisterService} from './register/register.service';
import { AppComponent } from './app.component';

import { LoginApiService } from './login/login-api.service';

import { AuthGuard } from './login/auth.guard';
import { ForgotService } from './forgot/forgot-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    RegisterService,LoginApiService, AuthGuard, ForgotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
