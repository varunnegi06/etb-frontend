import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/login/auth.guard';

const routes: Routes = [
  { path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule) },
  { path: "register", loadChildren: () => import("./register/register.module").then(m => m.RegisterModule) },
  { path: "forgot", loadChildren: () => import("./forgot/forgot.module").then(m => m.ForgotModule) },
  { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: "", loadChildren: () => import("./login/login.module").then(m => m.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
