import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SmoothScrollModule } from 'ngx-scrollbar/smooth-scroll';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgxsModule } from '@ngxs/store';
import { SwiperModule } from 'swiper/angular';
import { PresentationRoutingModule } from '@presentation/presentation-routing.module';
import { CrossModule } from '@cross/cross.module';

import { APP_NZ_ICONS, STATES } from './constants';

import { TopNavComponent } from './cross/top-nav/top-nav.component';
import { NormalLayoutComponent } from './platform/layouts/normal/normal-layout.component';
import { LogoComponent } from './cross/logo/logo.component';
import { VideoListItemComponent } from './platform/video/video-list-item/video-list-item.component';
import { BlogListItemComponent } from './platform/blog/blog-list-item/blog-list-item.component';
import { HomePageComponent } from './platform/pages/home-page/home-page.component';
import { LoginPageComponent } from './platform/pages/login-page/login-page.component';
import { RegisterPageComponent } from './platform/pages/register-page/register-page.component';
import { VideoDetailPageComponent } from './platform/video/video-detail-page/video-detail-page.component';
import { PageNotFoundComponent } from './cross/pages/page-not-found/page-not-found.component';
import { FooterComponent } from './cross/footer/footer.component';
import { BannerComponent } from './cross/banner/banner.component';
import { HalfCollapsedSectionComponent } from './cross/half-collapsed-section/half-collapsed-section.component';
import { BlogDetailPageComponent } from './platform/blog/blog-detail-page/blog-detail-page.component';

import { NavDropdownDirective } from './cross/top-nav/nav-dropdown/nav-dropdown.directive';

@NgModule({
  declarations: [
    TopNavComponent,
    NormalLayoutComponent,
    NavDropdownDirective,
    LogoComponent,
    VideoListItemComponent,
    BlogListItemComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VideoDetailPageComponent,
    PageNotFoundComponent,
    FooterComponent,
    BannerComponent,
    HalfCollapsedSectionComponent,
    BlogDetailPageComponent
  ],
  imports: [
    CommonModule,
    CrossModule,
    NgxsModule.forFeature(STATES),
    NgScrollbarModule,
    SmoothScrollModule,
    PresentationRoutingModule,
    NzNoAnimationModule,
    NzPaginationModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule.forChild(APP_NZ_ICONS),
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzAvatarModule,
    NzCommentModule,
    NzCardModule,
    NzDropDownModule,
    SwiperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserTransferStateModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PresentationModule { }
