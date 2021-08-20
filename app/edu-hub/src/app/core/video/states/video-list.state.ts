import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { orderBy, random } from 'lodash';

import { VideoFilterSortBy, VIDEO_STATES } from '../constants';

import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { VideoModel } from '../models/video.model';
import { VideoQueries } from '../queries/video.queries';

import { TransferableState } from '@cross/state/transferable-state';

import { MockDatabaseService } from '@persistence/database/mock-database.service';

class VideoListStateModel {

    constructor(public videos = new FilterResponseModel<VideoModel>(),
        public recommendedVideos: VideoModel[] = [],
        public randomVideos: VideoModel[] = []) {
    }

    static get default() {
        return new VideoListStateModel();
    }
}

@State<VideoListStateModel>({
    name: VIDEO_STATES.video.videoList.name,
    defaults: VideoListStateModel.default
})
@Injectable()
export class VideoListState extends TransferableState<VideoListStateModel> implements NgxsOnInit {

    protected transferStateKeyName: string = VideoListState.name;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        transferState: TransferState,
        private _databaseService: MockDatabaseService
    ) {
        super(platformId, transferState);
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        super.ngxsOnInit(ctx);
        const transferredState = VideoListStateModel.default;

        if (this.shouldLoad) {
            this.isPlatformServer && this.setTransferredState(transferredState);
        } else {
            this.patchTransferredState(transferredState);
            ctx?.setState(transferredState);
        }
    }

    @Selector()
    static videos(state: VideoListStateModel) {
        return state.videos;
    }

    @Selector()
    static recommendedVideos(state: VideoListStateModel) {
        return state.recommendedVideos;
    }

    @Selector()
    static randomVideos(state: VideoListStateModel) {
        return state.randomVideos;
    }

    @Action(VideoQueries.Filter)
    filter(context: StateContext<VideoListStateModel>, query: VideoQueries.Filter) {
        return Promise.resolve().then(() => {
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
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), VideoListStateModel.default);
        });
    }

    @Action(VideoQueries.GetRecommended)
    getRecommended(context: StateContext<VideoListStateModel>, query: VideoQueries.GetRecommended) {
        return Promise.resolve().then(() => {
            const srcVideos = this._databaseService.database.videos;
            let videos = [...srcVideos].splice(0, 10);

            const patch = {
                recommendedVideos: videos
            };

            context.patchState(patch);
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), VideoListStateModel.default);
        });
    }

    @Action(VideoQueries.GetRandomList)
    getRandomList(context: StateContext<VideoListStateModel>, query: VideoQueries.GetRandomList) {
        return Promise.resolve().then(() => {
            const srcVideos = this._databaseService.database.videos;
            let videos = [...srcVideos].splice(0, random(srcVideos.length));

            const patch = {
                randomVideos: videos
            };

            context.patchState(patch);
            this.shouldLoad && this.isPlatformServer
                && this.updateTransferredState((state) => Object.assign(state, patch), VideoListStateModel.default);
        });
    }
}