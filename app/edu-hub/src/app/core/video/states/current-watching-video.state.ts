import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { cloneDeep } from 'lodash';

import { VIDEO_STATES } from '../constants';

import { VideoDetailModel } from '../models/video-detail.model';
import { VideoQueries } from '../queries/video.queries';

import { MockDatabaseService } from '@persistence/storage/mock-database.service';

export const CURRENT_WATCHING_VIDEO_STATES = VIDEO_STATES.video.currentWatchingVideo;
export const GET_VIDEO_DETAIL_STATES = CURRENT_WATCHING_VIDEO_STATES.states.getDetail;

class CurrentWatchingVideoStateModel {

    constructor(public video?: VideoDetailModel,
        public getVideoDetailState: string = GET_VIDEO_DETAIL_STATES.unset) {
    }
}

@State<CurrentWatchingVideoStateModel>({
    name: VIDEO_STATES.video.currentWatchingVideo.name,
    defaults: new CurrentWatchingVideoStateModel()
})
@Injectable()
export class CurrentWatchingVideoState {

    constructor(private _databaseService: MockDatabaseService) {
    }

    @Selector()
    static video(state: CurrentWatchingVideoStateModel) {
        return state.video;
    }

    @Selector()
    static getVideoDetailState(state: CurrentWatchingVideoStateModel) {
        return state.getVideoDetailState;
    }

    @Action(VideoQueries.GetDetail)
    filter(context: StateContext<CurrentWatchingVideoStateModel>, query: VideoQueries.GetDetail) {
        const srcVideos = this._databaseService.database.videos;
        const videoDetail = srcVideos.find(video => video.id == query.id);

        if (!videoDetail) {
            context.patchState({
                getVideoDetailState: GET_VIDEO_DETAIL_STATES.notFound
            });
            return;
        }

        const videoDetailModel = cloneDeep(videoDetail) as VideoDetailModel;
        context.patchState({
            video: videoDetailModel
        });
    }
}