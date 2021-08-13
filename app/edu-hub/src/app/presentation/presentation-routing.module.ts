import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { A_ROUTING, ROUTING } from '../constants';
import { ROUTING_DATA } from './constants';

import { RoutingData } from './auth/models/routing-data.model';

import { PageNotFoundComponent } from '@presentation/cross/pages/page-not-found/page-not-found.component';
import { BlogDetailPageComponent } from '@presentation/platform/blog/blog-detail-page/blog-detail-page.component';
import { NormalLayoutComponent } from '@presentation/platform/layouts/normal/normal-layout.component';
import { HomePageComponent } from '@presentation/platform/pages/home-page/home-page.component';
import { LoginPageComponent } from '@presentation/platform/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@presentation/platform/pages/register-page/register-page.component';
import { VideoDetailPageComponent } from '@presentation/platform/video/video-detail-page/video-detail-page.component';

import { AnonymousOnlyPolicy } from './auth/policies/anonymous-only.policy';

import { RoutingAuthService } from './auth/routing-auth.service';

const routes: Routes = [
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      { path: ROUTING.home, component: HomePageComponent },
      { path: ROUTING.videoDetail, component: VideoDetailPageComponent },
      { path: ROUTING.blogDetail, component: BlogDetailPageComponent }
    ]
  },
  {
    path: ROUTING.login,
    component: LoginPageComponent,
    data: {
      ...ROUTING_DATA.common,
      accessDeniedPath: A_ROUTING.home,
      policies: [AnonymousOnlyPolicy]
    } as RoutingData,
    canActivate: [RoutingAuthService]
  },
  {
    path: ROUTING.registration,
    component: RegisterPageComponent,
    data: {
      ...ROUTING_DATA.common,
      accessDeniedPath: A_ROUTING.home,
      policies: [AnonymousOnlyPolicy]
    } as RoutingData,
    canActivate: [RoutingAuthService]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule],
  providers: [RoutingAuthService]
})
export class PresentationRoutingModule { }
