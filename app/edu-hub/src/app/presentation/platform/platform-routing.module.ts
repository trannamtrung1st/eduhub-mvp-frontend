import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { ROUTING_DATA } from '@presentation/constants';
import { A_ROUTING, ROUTING } from '@app/constants';

import { RoutingData } from '@presentation/cross/routing/models/routing-data.model';

import { AnonymousOnlyPolicy } from '@presentation/auth/policies/anonymous-only.policy';

import { NormalLayoutComponent } from '@presentation/platform/layouts/normal-layout/normal-layout.component';
import { HomePageComponent } from '@presentation/platform/pages/home-page/home-page.component';
import { LoginPageComponent } from '@presentation/platform/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@presentation/platform/pages/register-page/register-page.component';
import { VideoDetailPageComponent } from './pages/video-detail-page/video-detail-page.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';

import { RoutingAuthService } from '@presentation/auth/routing/routing-auth.service';

const routes: Routes = [
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      { path: ROUTING.platform.home, component: HomePageComponent },
      {
        path: ROUTING.platform.video.base,
        children: [
          { path: ROUTING.platform.video.detail, component: VideoDetailPageComponent },
          { path: '', redirectTo: A_ROUTING.platform.home }
        ]
      },
      {
        path: ROUTING.platform.blog.base,
        children: [
          { path: ROUTING.platform.blog.detail, component: BlogDetailPageComponent },
          { path: '', redirectTo: A_ROUTING.platform.home }
        ]
      }
    ]
  },
  {
    path: ROUTING.platform.login,
    component: LoginPageComponent,
    data: {
      ...ROUTING_DATA.common,
      accessDeniedPath: A_ROUTING.platform.home,
      policies: [AnonymousOnlyPolicy]
    } as RoutingData,
    canActivate: [RoutingAuthService]
  },
  {
    path: ROUTING.platform.registration,
    component: RegisterPageComponent,
    data: {
      ...ROUTING_DATA.common,
      accessDeniedPath: A_ROUTING.platform.home,
      policies: [AnonymousOnlyPolicy]
    } as RoutingData,
    canActivate: [RoutingAuthService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PresentationAuthModule
  ],
  exports: [RouterModule],
})
export class PlatformRoutingModule { }
