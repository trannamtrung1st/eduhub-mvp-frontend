import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { A_ROUTING, ROUTING } from '@app/constants';
import { ROUTING_DATA } from '@presentation/constants';

import { RoutingData } from '@presentation/cross/routing/models/routing-data.model';

import { AuthenticatedUserPolicy } from '@presentation/auth/policies/authenticated-user.policy';

import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MediasPageComponent } from './pages/medias/medias-page/medias-page.component';
import { CreateVideoPageComponent } from './pages/medias/create-video-page/create-video-page.component';
import { CreateBlogPageComponent } from './pages/medias/create-blog-page/create-blog-page.component';

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
      {
        path: ROUTING.management.profile,
        component: ProfilePageComponent,
        data: {
          breadcrumb: 'Profile',
          title: 'Profile',
          subTitle: 'This is your personal profile'
        } as RoutingData
      },
      {
        path: ROUTING.management.medias.base,
        data: {
          breadcrumb: 'Medias'
        } as RoutingData,
        children: [
          {
            path: '',
            component: MediasPageComponent,
            data: {
              title: 'Medias',
              subTitle: 'Manage your medias'
            } as RoutingData
          },
          {
            path: ROUTING.management.medias.video.base,
            children: [
              {
                path: ROUTING.management.medias.video.create,
                component: CreateVideoPageComponent,
                data: {
                  breadcrumb: 'New Video',
                  title: 'New Video',
                  subTitle: 'Upload your video to share your knowledge'
                } as RoutingData
              },
              { path: '', redirectTo: A_ROUTING.management.medias.base }
            ]
          },
          {
            path: ROUTING.management.medias.blog.base,
            children: [
              {
                path: ROUTING.management.medias.blog.create,
                component: CreateBlogPageComponent,
                data: {
                  breadcrumb: 'Write Blog',
                  title: 'Write Blog',
                  subTitle: 'Write your article'
                } as RoutingData
              },
              { path: '', redirectTo: A_ROUTING.management.medias.base }
            ]
          }
        ]
      }
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
