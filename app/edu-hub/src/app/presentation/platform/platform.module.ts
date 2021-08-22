import { NgModule } from '@angular/core';
import { PlatformRoutingModule } from './platform-routing.module';
import { CrossModule as PresentationCrossModule } from '@presentation/cross/cross.module';
import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { VideoDetailPageComponent } from './pages/video-detail-page/video-detail-page.component';
import { BlogDetailPageComponent } from './pages/blog-detail-page/blog-detail-page.component';
import { FeedbackPageComponent } from './pages/feedback-page/feedback-page.component';

@NgModule({
  declarations: [
    NormalLayoutComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VideoDetailPageComponent,
    BlogDetailPageComponent,
    FeedbackPageComponent
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    PlatformRoutingModule,
    PresentationCrossModule,
    PresentationAuthModule
  ]
})
export class PlatformModule { }
