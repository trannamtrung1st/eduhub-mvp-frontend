import {
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone,
    TwitterOutline, FacebookOutline, YoutubeOutline, LinkedinOutline,
    LogoutOutline, LaptopOutline
} from '@ant-design/icons-angular/icons';

import { A_ROUTING } from '@app/constants';

import { GlobalState } from '@core/global/states/global.state';
import { LoaderState } from '@core/global/states/loader.state';
import { CurrentUserState } from '@core/identity/states/current-user.state';
import { IdentityState } from '@core/identity/states/identity.state';
import { BlogListState } from "@core/blog/states/blog-list.state";
import { BlogState } from "@core/blog/states/blog.state";
import { AllSubjectsState } from "@core/subject/states/all-subjects.state";
import { SubjectState } from "@core/subject/states/subject.state";
import { CurrentWatchingVideoState } from '@core/video/states/current-watching-video.state';
import { VideoListState } from "@core/video/states/video-list.state";
import { VideoState } from "@core/video/states/video.state";

import { RoutingData } from './auth/models/routing-data.model';

export const STATES = [
    // Global
    GlobalState,
    LoaderState,

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
        loginPath: A_ROUTING.login
    } as RoutingData
};