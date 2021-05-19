import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [DashboardComponent, ProfileComponent, ProductTemplateComponent, SettingsComponent],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
