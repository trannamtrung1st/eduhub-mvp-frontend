import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTING } from '@app/constants';

import { PageNotFoundComponent } from '@presentation/cross/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: ROUTING.management.base, loadChildren: () => import('./management/management.module').then(m => m.ManagementModule) },
  { path: ROUTING.platform.base, loadChildren: () => import('./platform/platform.module').then(m => m.PlatformModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled'
    })
  ],
  exports: [RouterModule],
})
export class PresentationRoutingModule { }
