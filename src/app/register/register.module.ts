import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { Register2Component } from './register2/register2.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    Register2Component, PaymentComponent],
  imports: [
    SharedModule,
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
