import { VideoDetailModel } from "@core/video/states/models/video-detail.model";

export class GetVideoDetailSuccess {
    static readonly type = '[EduHub] Get Video Detail Success';

    constructor(public videoDetail: VideoDetailModel) {
    }
}