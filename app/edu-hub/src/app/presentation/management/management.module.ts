import { NgModule } from '@angular/core';
import { ManagementRoutingModule } from './management-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { CrossModule as PresentationCrossModule } from '@presentation/cross/cross.module';
import { AuthModule as PresentationAuthModule } from '@presentation/auth/auth.module';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { NormalLayoutComponent } from './layouts/normal-layout/normal-layout.component';
import { PageHeaderComponent } from './cross/page-header/page-header.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MediasPageComponent } from './pages/medias/medias-page/medias-page.component';
import { CreateVideoPageComponent } from './pages/medias/create-video-page/create-video-page.component';
import { VideoFormComponent } from './video/video-form/video-form.component';
import { CreateBlogPageComponent } from './pages/medias/create-blog-page/create-blog-page.component';
import { BlogFormComponent } from './blog/blog-form/blog-form.component';

@NgModule({
  declarations: [
    NormalLayoutComponent,
    ProfilePageComponent,
    PageHeaderComponent,
    MediasPageComponent,
    CreateVideoPageComponent,
    VideoFormComponent,
    CreateBlogPageComponent,
    BlogFormComponent
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    MarkdownModule.forChild(),
    ManagementRoutingModule,
    PresentationCrossModule,
    PresentationAuthModule
  ]
})
export class ManagementModule { }
