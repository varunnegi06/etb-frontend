import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotRoutingModule } from './forgot-routing.module';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Step1Component, Step2Component],
  imports: [
    SharedModule,
    CommonModule,
    ForgotRoutingModule,
    ReactiveFormsModule
  ]
})
export class ForgotModule { }
