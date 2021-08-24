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
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxsModule } from '@ngxs/store';
import { SwiperModule } from 'swiper/angular';
import { CrossModule } from '@cross/cross.module';

import {
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone,
    TwitterOutline, FacebookOutline, YoutubeOutline, LinkedinOutline,
    LogoutOutline, LaptopOutline, PlaySquareOutline, EditOutline,
    VerticalAlignTopOutline, VerticalAlignBottomOutline, BoldOutline, ItalicOutline, UnderlineOutline,
    StrikethroughOutline, FontSizeOutline, UnorderedListOutline, OrderedListOutline,
    CheckSquareOutline, QuestionOutline, CodeOutline, LinkOutline, FileImageOutline,
    TableOutline
} from '@ant-design/icons-angular/icons';

import { A_ROUTING } from '@app/constants';

import { CommonState } from '@core/common/states/common.state';
import { IdentityState } from '@core/identity/states/identity.state';
import { BlogState } from "@core/blog/states/blog.state";
import { SubjectState } from "@core/subject/states/subject.state";
import { VideoState } from "@core/video/states/video.state";

import { RoutingData } from './cross/routing/models/routing-data.model';

export const STATES = [
    // Global
    CommonState,

    // Subject
    SubjectState,

    // Video
    VideoState,

    // Blog
    BlogState,

    // Identity
    IdentityState,
];

export const APP_NZ_ICONS = [
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone,
    TwitterOutline, FacebookOutline, YoutubeOutline, LinkedinOutline,
    LogoutOutline, LaptopOutline, PlaySquareOutline, EditOutline,
    VerticalAlignTopOutline, VerticalAlignBottomOutline, BoldOutline, ItalicOutline, UnderlineOutline,
    StrikethroughOutline, FontSizeOutline, UnorderedListOutline, OrderedListOutline,
    CheckSquareOutline, QuestionOutline, CodeOutline, LinkOutline, FileImageOutline,
    TableOutline
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
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzImageModule,
    NzTypographyModule,
    NzTableModule,
    NzTabsModule,
    NzUploadModule,
    NzMessageModule,
    NzBackTopModule,
    NzToolTipModule,
    NzModalModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule
];