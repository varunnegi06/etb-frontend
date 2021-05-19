import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { Register2Component } from './register2/register2.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "step2", component: Register2Component },
  { path: "payment", component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
