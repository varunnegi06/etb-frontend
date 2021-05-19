import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path : "",component : DashboardComponent},
  {path : "company-profile",component : ProfileComponent},
  {path : "product-template",component : ProductTemplateComponent},
  {path : "settings",component : SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
