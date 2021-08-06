import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { orderBy } from 'lodash';

import { VideoFilterSortBy, VIDEO_STATES } from '../constants';

import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { VideoModel } from '../models/video.model';
import { VideoQueries } from '../queries/video.queries';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

class FilteredVideosStateModel {

    constructor(public videos = new FilterResponseModel<VideoModel>()) {
    }
}

@State<FilteredVideosStateModel>({
    name: VIDEO_STATES.video.filteredVideos.name,
    defaults: new FilteredVideosStateModel()
})
@Injectable()
export class FilteredVideosState {

    constructor(private _databaseService: MockDatabaseService) {
    }

    @Selector()
    static videos(state: FilteredVideosStateModel) {
        return state.videos;
    }

    @Action(VideoQueries.Filter)
    filter(context: StateContext<FilteredVideosStateModel>, query: VideoQueries.Filter) {
        const srcVideos = this._databaseService.database.videos;
        let videos = [...srcVideos];

        if (query.searchTerm) {
            const searchTerm = query.searchTerm?.toLowerCase();
            videos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));
        }

        if (query.subjects?.length) {
            videos = videos.filter(video => query.subjects.includes(video.subjectId));
        }

        switch (query.sortBy) {
            case VideoFilterSortBy.Title:
                videos = orderBy(videos, video => video.title, query.isDesc ? 'desc' : 'asc');
                break;
        }

        const totalRecords = videos.length;
        videos = videos.slice(query.skip, query.skip + query.take);

        context.patchState({
            videos: {
                records: videos,
                totalRecords
            }
        });
    }

}