import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AppRoutingModule } from '@app/app-routing.module';

import { TopNavComponent } from './layout/normal/top-nav/top-nav.component';
import { NormalLayoutComponent } from './layout/normal/normal-layout.component';
import { LogoComponent } from './components/cross/logo/logo.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { VideoListItemComponent } from './components/video/video-list-item/video-list-item.component';
import { PostListItemComponent } from './components/post/post-list-item/post-list-item.component';

import { NavDropdownDirective } from './layout/normal/top-nav/nav-dropdown/nav-dropdown.directive';

@NgModule({
  declarations: [
    TopNavComponent,
    NormalLayoutComponent,
    NavDropdownDirective,
    LogoComponent,
    VideoListItemComponent,
    PostListItemComponent,
    HomePageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    AppRoutingModule,
    FormsModule,
    NzPaginationModule,
    NzFormModule,
    NzCheckboxModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
})
export class PresentationModule { }
