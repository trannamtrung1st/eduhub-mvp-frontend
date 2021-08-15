import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { ROUTING } from '@app/constants';
import { ROUTING_DATA } from '@presentation/constants';

import { RoutingData } from '@presentation/auth/routing/models/routing-data.model';

import { AuthenticatedUserPolicy } from '@presentation/auth/policies/authenticated-user.policy';

import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { ProfilePageComponent } from './user/pages/profile-page/profile-page.component';

import { RoutingAuthService } from '@presentation/auth/routing/routing-auth.service';

const routes: Routes = [
  {
    path: '',
    component: NormalLayoutComponent,
    data: {
      ...ROUTING_DATA.common,
      policies: [AuthenticatedUserPolicy]
    } as RoutingData,
    canActivate: [RoutingAuthService],
    children: [
      { path: '', redirectTo: ROUTING.management.profile },
      { path: ROUTING.management.profile, component: ProfilePageComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PresentationAuthModule
  ],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }
