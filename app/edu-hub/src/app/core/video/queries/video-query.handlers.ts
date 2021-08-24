import { FilterVideoHandler } from "./filter-video/filter-video.handler"
import { GetRandomVideosHandler } from "./get-random-videos/get-random-videos.handler"
import { GetRecommendedVideosHandler } from "./get-recommended-videos/get-recommended-videos.handler";
import { GetVideoDetailHandler } from "./get-video-detail/get-video-detail.handler"

const VideoQueryHandlers = null;

export {
    FilterVideoHandler as Filter,
    GetRandomVideosHandler as GetRandomList,
    GetRecommendedVideosHandler as GetRecommended,
    GetVideoDetailHandler as GetDetail,
    VideoQueryHandlers
}