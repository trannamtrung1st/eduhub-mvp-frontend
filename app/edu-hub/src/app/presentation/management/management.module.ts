import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { CrossModule as PresentationCrossModule } from '@presentation/cross/cross.module';
import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { ProfilePageComponent } from './user/pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    NormalLayoutComponent,
    ProfilePageComponent
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    ManagementRoutingModule,
    PresentationCrossModule,
    PresentationAuthModule
  ]
})
export class ManagementModule { }
