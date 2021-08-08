import {
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone
} from '@ant-design/icons-angular/icons';

import { GlobalState } from '@core/global/states/global.state';
import { LoaderState } from '@core/global/states/loader.state';
import { FilteredPostsState } from "@core/post/states/filtered-posts.state";
import { PostState } from "@core/post/states/post.state";
import { AllSubjectsState } from "@core/subject/states/all-subjects.state";
import { SubjectState } from "@core/subject/states/subject.state";
import { CurrentWatchingVideoState } from '@core/video/states/current-watching-video.state';
import { VideoListState } from "@core/video/states/video-list.state";
import { VideoState } from "@core/video/states/video.state";

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

    // Post
    PostState,
    FilteredPostsState
];

export const APP_NZ_ICONS = [
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline,
    UpOutline, DownOutline, LikeOutline, LikeTwoTone, DislikeOutline, DislikeTwoTone
];