import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AppRoutingModule } from './app-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { AppComponent } from './app.component';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { TopNavComponent } from '@cross/layout/top-nav/top-nav.component';
import { VideoListItemComponent } from '@domains/video/components/video-list-item/video-list-item.component';
import { PostListItemComponent } from '@domains/post/components/post-list-item/post-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TopNavComponent,
    VideoListItemComponent,
    PostListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzPaginationModule,
    NgScrollbarModule,
    FormsModule,
    NzFormModule,
    NzCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
