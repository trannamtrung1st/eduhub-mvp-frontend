import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTING } from './constants';

import { NormalLayoutComponent } from '@presentation/layouts/normal/normal-layout.component';
import { HomePageComponent } from '@presentation/pages/home-page/home-page.component';
import { LoginPageComponent } from '@presentation/pages/login-page/login-page.component';
import { RegisterPageComponent } from '@presentation/pages/register-page/register-page.component';
import { VideoDetailPageComponent } from '@presentation/pages/video-detail-page/video-detail-page.component';
import { PageNotFoundComponent } from '@presentation/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      { path: ROUTING.home, component: HomePageComponent },
      { path: ROUTING.videoDetail, component: VideoDetailPageComponent }
    ]
  },
  { path: ROUTING.login, component: LoginPageComponent },
  { path: ROUTING.registration, component: RegisterPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
