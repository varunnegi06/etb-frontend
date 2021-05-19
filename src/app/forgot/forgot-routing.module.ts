import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';

const routes: Routes = [
  {path : "step/1",component : Step1Component},
  {path : "step/2",component : Step2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotRoutingModule { }
