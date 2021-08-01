import { InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline } from '@ant-design/icons-angular/icons';

import { FilteredPostsState } from "@core/post/states/filtered-posts.state";
import { PostState } from "@core/post/states/post.state";
import { AllSubjectsState } from "@core/subject/states/all-subjects.state";
import { SubjectState } from "@core/subject/states/subject.state";
import { FilteredVideosState } from "@core/video/states/filtered-videos.state";
import { VideoState } from "@core/video/states/video.state";

export const STATES = [
    // Subject
    SubjectState,
    AllSubjectsState,

    // Video
    VideoState,
    FilteredVideosState,

    // Post
    PostState,
    FilteredPostsState
];

export const APP_NZ_ICONS = [
    InfoCircleTwoTone, LockOutline, UserOutline, SortDescendingOutline
];