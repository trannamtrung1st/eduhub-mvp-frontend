import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTING } from './constants';

import { NormalLayoutComponent } from '@presentation/layouts/normal/normal-layout.component';
import { HomePageComponent } from '@presentation/pages/home-page/home-page.component';
import { LoginPageComponent } from '@presentation/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      { path: ROUTING.home, component: HomePageComponent },
    ]
  },
  { path: ROUTING.login, component: LoginPageComponent },
  { path: '**', redirectTo: ROUTING.home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
