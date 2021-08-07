import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { orderBy } from 'lodash';

import { VideoFilterSortBy, VIDEO_STATES } from '../constants';

import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { VideoModel } from '../models/video.model';
import { VideoQueries } from '../queries/video.queries';

import { TransferableState } from '@core/cross/state-transferable/transferable-state';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

class FilteredVideosStateModel {

    constructor(public videos = new FilterResponseModel<VideoModel>()) {
    }

    static get default() {
        return new FilteredVideosStateModel();
    }
}

@State<FilteredVideosStateModel>({
    name: VIDEO_STATES.video.filteredVideos.name,
    defaults: FilteredVideosStateModel.default
})
@Injectable()
export class FilteredVideosState extends TransferableState<FilteredVideosStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = FilteredVideosState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = FilteredVideosStateModel.default;

        if (this.needInitData) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
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

        const patch = {
            videos: {
                records: videos,
                totalRecords
            }
        };

        context.patchState(patch);
        this.needInitData && this.isPlatformServer
            && this.updateTransferredState((state) => Object.assign(state, patch), FilteredVideosStateModel.default);
    }

}