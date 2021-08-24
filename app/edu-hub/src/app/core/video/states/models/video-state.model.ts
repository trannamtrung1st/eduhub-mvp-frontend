import { FilterResponseModel } from "@cross/filter/models/filter-response.model";
import { VideoDetailEvent } from "./video-detail-event.model";
import { VideoDetailModel } from "./video-detail.model";
import { VideoModel } from "./video.model";

export class VideoStateModel {

    constructor(public filteredVideos = new FilterResponseModel<VideoModel>(),
        public recommendedVideos: VideoModel[] = [],
        public randomVideos: VideoModel[] = [],
        public videoDetail?: VideoDetailModel,
        public videoDetailEvent?: VideoDetailEvent) { }

    static get default() {
        return new VideoStateModel();
    }
}