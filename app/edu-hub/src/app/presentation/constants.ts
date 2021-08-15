import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NgxsModule } from '@ngxs/store';
import { SwiperModule } from 'swiper/angular';
import { CrossModule } from '@cross/cross.module';

import {
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone,
    TwitterOutline, FacebookOutline, YoutubeOutline, LinkedinOutline,
    LogoutOutline, LaptopOutline
} from '@ant-design/icons-angular/icons';

import { A_ROUTING } from '@app/constants';

import { GlobalState } from '@core/global/states/global.state';
import { LoaderState } from '@core/global/states/loader.state';
import { ManagementMenuState } from '@core/global/states/management-menu.state';
import { CurrentUserState } from '@core/identity/states/current-user.state';
import { IdentityState } from '@core/identity/states/identity.state';
import { BlogListState } from "@core/blog/states/blog-list.state";
import { BlogState } from "@core/blog/states/blog.state";
import { AllSubjectsState } from "@core/subject/states/all-subjects.state";
import { SubjectState } from "@core/subject/states/subject.state";
import { CurrentWatchingVideoState } from '@core/video/states/current-watching-video.state';
import { VideoListState } from "@core/video/states/video-list.state";
import { VideoState } from "@core/video/states/video.state";

import { RoutingData } from './auth/routing/models/routing-data.model';

export const STATES = [
    // Global
    GlobalState,
    LoaderState,
    ManagementMenuState,

    // Subject
    SubjectState,
    AllSubjectsState,

    // Video
    VideoState,
    VideoListState,
    CurrentWatchingVideoState,

    // Blog
    BlogState,
    BlogListState,

    // Identity
    IdentityState,
    CurrentUserState
];

export const APP_NZ_ICONS = [
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone,
    TwitterOutline, FacebookOutline, YoutubeOutline, LinkedinOutline,
    LogoutOutline, LaptopOutline
];

export const ROUTING_DATA = {
    common: {
        accessDeniedPath: A_ROUTING.accessDenied,
        loginPath: A_ROUTING.platform.login
    } as RoutingData
};

export const SHARED_PRESENTATION_MODULES = [
    CommonModule,
    CrossModule,
    NgxsModule.forFeature(STATES),
    NgScrollbarModule,
    SmoothScrollModule,
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
    NzLayoutModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule
];