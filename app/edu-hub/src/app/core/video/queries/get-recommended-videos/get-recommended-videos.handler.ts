import { Injectable } from "@angular/core";

import { CoreModule } from "@core/core.module";

import { VideoModel } from "@core/video/states/models/video.model";
import { GetRecommendedVideosQuery } from "./get-recommended-videos.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

@Injectable({
    providedIn: CoreModule
})
export class GetRecommendedVideosHandler {
    constructor(private _databaseService: MockDatabaseService) {
    }

    handle(request: GetRecommendedVideosQuery): Promise<VideoModel[]> {
        return Promise.resolve().then(() => {
            const srcVideos = this._databaseService.database.videos;
            let videos = [...srcVideos].splice(0, 10);
            return videos;
        });
    }
}