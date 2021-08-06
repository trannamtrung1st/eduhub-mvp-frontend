import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SmoothScrollModule } from 'ngx-scrollbar/smooth-scroll';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from '@app/app-routing.module';

import { APP_NZ_ICONS, STATES } from './constants';

import { TopNavComponent } from './layouts/normal/top-nav/top-nav.component';
import { NormalLayoutComponent } from './layouts/normal/normal-layout.component';
import { LogoComponent } from './components/cross/logo/logo.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { VideoListItemComponent } from './components/video/video-list-item/video-list-item.component';
import { PostListItemComponent } from './components/post/post-list-item/post-list-item.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { VideoDetailPageComponent } from './pages/video-detail-page/video-detail-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { NavDropdownDirective } from './layouts/normal/top-nav/nav-dropdown/nav-dropdown.directive';

@NgModule({
  declarations: [
    TopNavComponent,
    NormalLayoutComponent,
    NavDropdownDirective,
    LogoComponent,
    VideoListItemComponent,
    PostListItemComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    VideoDetailPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature(STATES),
    NgScrollbarModule,
    SmoothScrollModule,
    AppRoutingModule,
    NzPaginationModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule.forChild(APP_NZ_ICONS),
    NzInputModule,
    NzSelectModule,
    NzTagModule,
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
