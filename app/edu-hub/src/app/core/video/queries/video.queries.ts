import { FilterVideoQuery } from "./filter-video/filter-video.query";
import { GetRandomVideosQuery } from "./get-random-videos/get-random-videos.query";
import { GetRecommendedVideosQuery } from "./get-recommended-videos/get-recommended-videos.query";
import { GetVideoDetailNotFound } from "./get-video-detail/get-video-detail-notfound.event";
import { GetVideoDetailSuccess } from "./get-video-detail/get-video-detail-success.event";
import { GetVideoDetailQuery } from "./get-video-detail/get-video-detail.query";

const VideoQueries = null;

export {
    FilterVideoQuery as Filter,
    GetRandomVideosQuery as GetRandomList,
    GetRecommendedVideosQuery as GetRecommended,

    GetVideoDetailQuery as GetDetail,
    GetVideoDetailSuccess as GetDetailSuccess,
    GetVideoDetailNotFound as GetDetailNotFound,

    VideoQueries
}