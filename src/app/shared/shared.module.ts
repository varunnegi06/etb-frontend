import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LeftPanelComponent,
    SidenavComponent,
    ProfileNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports :[
    ProfileNavComponent,
    SidenavComponent,
    LeftPanelComponent
  ]
})
export class SharedModule { }
