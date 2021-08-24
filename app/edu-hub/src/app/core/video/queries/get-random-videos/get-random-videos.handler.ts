import { Injectable } from "@angular/core";

import { random } from "lodash";

import { CoreModule } from "@core/core.module";

import { VideoModel } from "@core/video/states/models/video.model";
import { GetRandomVideosQuery } from "./get-random-videos.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

@Injectable({
    providedIn: CoreModule
})
export class GetRandomVideosHandler {
    constructor(private _databaseService: MockDatabaseService) {
    }

    handle(request: GetRandomVideosQuery): Promise<VideoModel[]> {
        return Promise.resolve().then(() => {
            const srcVideos = this._databaseService.database.videos;
            let videos = [...srcVideos].splice(0, random(srcVideos.length));
            return videos;
        });
    }
}