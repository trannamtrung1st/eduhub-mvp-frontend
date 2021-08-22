import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { MarkdownModule } from 'ngx-markdown';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { TopNavComponent } from './common/top-nav/top-nav.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { VideoListItemComponent } from './video/video-list-item/video-list-item.component';
import { BlogListItemComponent } from './blog/blog-list-item/blog-list-item.component';
import { LogoComponent } from './common/logo/logo.component';
import { BannerComponent } from './common/banner/banner.component';
import { FooterComponent } from './common/footer/footer.component';
import { HalfCollapsedSectionComponent } from './common/half-collapsed-section/half-collapsed-section.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { BacktopComponent } from './common/backtop/backtop.component';
import { MarkdownEditorComponent } from './common/markdown-editor/markdown-editor.component';

const ngZorroConfig: NzConfig = {
};

@NgModule({
  declarations: [
    TopNavComponent,
    LogoComponent,
    PageNotFoundComponent,
    BannerComponent,
    FooterComponent,
    HalfCollapsedSectionComponent,
    VideoListItemComponent,
    BlogListItemComponent,
    BreadcrumbComponent,
    BacktopComponent,
    MarkdownEditorComponent
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    RouterModule,
    MarkdownModule.forChild()
  ],
  exports: [
    TopNavComponent,
    LogoComponent,
    PageNotFoundComponent,
    BannerComponent,
    FooterComponent,
    HalfCollapsedSectionComponent,
    VideoListItemComponent,
    BlogListItemComponent,
    BreadcrumbComponent,
    BacktopComponent,
    MarkdownEditorComponent
  ],
  providers: [
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_I18N, useValue: en_US }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CrossModule { }
