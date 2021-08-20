import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { TopNavComponent } from './common/top-nav/top-nav.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { VideoListItemComponent } from './video/video-list-item/video-list-item.component';
import { BlogListItemComponent } from './blog/blog-list-item/blog-list-item.component';
import { LogoComponent } from './common/logo/logo.component';
import { BannerComponent } from './common/banner/banner.component';
import { FooterComponent } from './common/footer/footer.component';
import { HalfCollapsedSectionComponent } from './common/half-collapsed-section/half-collapsed-section.component';

@NgModule({
  declarations: [
    TopNavComponent,
    LogoComponent,
    PageNotFoundComponent,
    BannerComponent,
    FooterComponent,
    HalfCollapsedSectionComponent,
    VideoListItemComponent,
    BlogListItemComponent
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    RouterModule
  ],
  exports: [
    TopNavComponent,
    LogoComponent,
    PageNotFoundComponent,
    BannerComponent,
    FooterComponent,
    HalfCollapsedSectionComponent,
    VideoListItemComponent,
    BlogListItemComponent
  ]
})
export class CrossModule { }
