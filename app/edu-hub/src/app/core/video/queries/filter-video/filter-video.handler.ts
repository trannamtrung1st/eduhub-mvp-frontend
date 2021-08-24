import { Injectable } from "@angular/core";

import { orderBy } from "lodash";

import { CoreModule } from "@core/core.module";

import { VideoFilterSortBy } from "@core/video/constants";

import { VideoModel } from "@core/video/states/models/video.model";
import { FilterResponseModel } from "@cross/filter/models/filter-response.model";
import { FilterVideoQuery } from "./filter-video.query";

import { MockDatabaseService } from "@persistence/database/mock-database.service";

@Injectable({
    providedIn: CoreModule
})
export class FilterVideoHandler {
    constructor(private _databaseService: MockDatabaseService) {
    }

    handle(request: FilterVideoQuery): Promise<FilterResponseModel<VideoModel>> {
        return Promise.resolve().then(() => {
            const srcVideos = this._databaseService.database.videos;
            let videos = [...srcVideos];

            if (request.searchTerm) {
                const searchTerm = request.searchTerm?.toLowerCase();
                videos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));
            }

            if (request.subjects?.length) {
                videos = videos.filter(video => request.subjects.includes(video.subjectId));
            }

            switch (request.sortBy) {
                case VideoFilterSortBy.Title:
                    videos = orderBy(videos, video => video.title, request.isDesc ? 'desc' : 'asc');
                    break;
            }

            const totalRecords = videos.length;
            videos = videos.slice(request.skip, request.skip + request.take);

            return new FilterResponseModel(videos, totalRecords);
        });
    }
}