//Modules
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutModule } from '../shared/modules/layout.module';
//Components
import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    LayoutModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
