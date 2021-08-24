import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';

import { APP_STATUS_STATES } from '@core/common/states/common.state';
import { COMMENTS } from '@domains/comment/constants';

import { VideoDetailModel } from '@core/video/states/models/video-detail.model';
import { VideoDetailViewModel } from './view-model/video-detail-view.model';
import { VideoModel } from '@core/video/states/models/video.model';
import { VideoViewModel } from '@presentation/cross/video/video-list-item/view-models/video-view.model';
import { VideoDetailEvent } from '@core/video/states/models/video-detail-event.model';
import * as CommonCommands from '@core/common/commands/common.commands';
import * as VideoQueries from '@core/video/queries/video.queries';

import { VideoState } from '@core/video/states/video.state';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-video-detail-page',
  templateUrl: './video-detail-page.component.html',
  styleUrls: ['./video-detail-page.component.scss']
})
export class VideoDetailPageComponent extends BaseComponent<VideoDetailState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = VideoDetailPageComponent.name;

  video?: VideoDetailViewModel;
  comments = COMMENTS;
  recommendedVideos: VideoViewModel[];
  currentComment: string;

  @Select(VideoState.videoDetailEvent) private _videoDetailEvent$!: Observable<VideoDetailEvent>;
  @Select(VideoState.recommendedVideos) private _recommendedVideos$!: Observable<VideoModel[]>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _nzMessageService: NzMessageService,
    private _route: ActivatedRoute) {
    super(platformId, transferState);
    this.recommendedVideos = [];
    this.currentComment = '';
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    this._route.params.subscribe(async params => {
      const id = params['id'];

      if (isBrowser) {
        const pageEl = document.querySelector('html') as HTMLElement;
        pageEl.scrollTop = 0;
        this.video = undefined;
        this._store.dispatch(new CommonCommands.ResetLoader());
      }

      if (this.shouldLoad) {
        const getVideoDetail$ = this._getVideoDetail(id);
        const getRecommendedVideos$ = this._getRecommendedVideos(id);

        if (this.isPlatformServer) {
          await Promise.all([getVideoDetail$, getRecommendedVideos$]);
          this.setTransferredState(new VideoDetailState(
            this.video, this.recommendedVideos
          ));
        } else {
          getVideoDetail$.then(() => this.video && this._store.dispatch(new CommonCommands.HideLoader()));
        }
      } else {
        this.patchTransferredState(this);
        isBrowser && this._store.dispatch(new CommonCommands.HideLoader());
      }
    });
  }

  private _getVideoDetail(id: string) {
    const isBrowser = !this.isPlatformServer;
    return this._store.dispatch(new VideoQueries.GetDetail(id))
      .pipe(withLatestFrom(this._videoDetailEvent$))
      .toPromise()
      .then(([_, { success, notFound }]) => {
        if (success) {
          this.video = cloneDeep(success.videoDetail);
        } else if (notFound) {
          !isBrowser && console.log('Video not found');
          this._store.dispatch(new CommonCommands.ChangeAppStatus(APP_STATUS_STATES.pageNotFound));
        }
      });
  }

  private _getRecommendedVideos(id: string) {
    const query = new VideoQueries.GetRecommended(id);
    return this._store.dispatch(query)
      .pipe(withLatestFrom(this._recommendedVideos$))
      .toPromise()
      .then(([_, videos]) => {
        this.recommendedVideos = videos.map(video => cloneDeep(video));
      });
  }
}

class VideoDetailState {

  constructor(
    public video?: VideoDetailModel,
    public recommendedVideos: VideoViewModel[] = [],
  ) {
  }
}