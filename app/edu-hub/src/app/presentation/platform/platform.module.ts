import { NgModule } from '@angular/core';
import { PlatformRoutingModule } from './platform-routing.module';
import { CrossModule as PresentationCrossModule } from '@presentation/cross/cross.module';
import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { VideoListItemComponent } from './video/components/video-list-item/video-list-item.component';
import { BlogListItemComponent } from './blog/components/blog-list-item/blog-list-item.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { VideoDetailPageComponent } from './video/pages/video-detail-page/video-detail-page.component';
import { BlogDetailPageComponent } from './blog/pages/blog-detail-page/blog-detail-page.component';

@NgModule({
  declarations: [
    NormalLayoutComponent,
    VideoListItemComponent,
    BlogListItemComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VideoDetailPageComponent,
    BlogDetailPageComponent
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    PlatformRoutingModule,
    PresentationCrossModule,
    PresentationAuthModule
  ]
})
export class PlatformModule { }
