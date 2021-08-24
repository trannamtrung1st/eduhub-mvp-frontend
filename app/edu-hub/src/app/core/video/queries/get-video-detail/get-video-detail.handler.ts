import { Injectable } from "@angular/core";

import { cloneDeep } from "lodash";

import { ErrorCode } from "@core/constants";

import { CoreModule } from "@core/core.module";

import { VideoDetailModel } from "@core/video/states/models/video-detail.model";
import { GetVideoDetailQuery } from "./get-video-detail.query";
import { AppError } from "@core/app.error";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

@Injectable({
    providedIn: CoreModule
})
export class GetVideoDetailHandler {

    constructor(private _databaseService: MockDatabaseService) { }

    handle(request: GetVideoDetailQuery): Promise<VideoDetailModel> {
        return Promise.resolve().then(() => {
            const srcVideos = this._databaseService.database.videos;
            const videoDetail = srcVideos.find(video => video.id == request.id);
            if (!videoDetail) throw new AppError(ErrorCode.videoNotFound);
            const videoDetailModel = cloneDeep(videoDetail) as VideoDetailModel;
            return videoDetailModel;
        });
    }
}
