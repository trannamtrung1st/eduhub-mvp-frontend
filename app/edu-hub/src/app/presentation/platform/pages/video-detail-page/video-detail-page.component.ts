import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { NzMessageService } from 'ng-zorro-antd/message';

import { APP_STATUS_STATES } from '@core/global/states/global.state';
import { COMMENTS } from '@domains/comment/constants';

import { GlobalCommands } from '@core/global/commands/global.commands';
import { VideoDetailModel } from '@core/video/models/video-detail.model';
import { VideoDetailViewModel } from './view-model/video-detail-view.model';
import { VideoQueries } from '@core/video/queries/video.queries';
import { LoaderCommands } from '@core/global/commands/loader.commands';
import { VideoModel } from '@core/video/models/video.model';
import { VideoViewModel } from '@presentation/cross/video/video-list-item/view-models/video-view.model';

import { CurrentWatchingVideoState, GET_VIDEO_DETAIL_STATES } from '@core/video/states/current-watching-video.state';
import { VideoListState } from '@core/video/states/video-list.state';

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
  videoFound: boolean;
  currentComment: string;

  @Select(CurrentWatchingVideoState.video) private _video$!: Observable<VideoDetailModel>;
  @Select(VideoListState.recommendedVideos) private _recommendedVideos$!: Observable<VideoModel[]>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _nzMessageService: NzMessageService,
    private _route: ActivatedRoute) {
    super(platformId, transferState);
    this.recommendedVideos = [];
    this.videoFound = true;
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
        this._store.dispatch(new LoaderCommands.Reset());
      }

      if (this.shouldLoad) {
        const getVideoDetail$ = this._getVideoDetail(id);
        const getRecommendedVideos$ = this._getRecommendedVideos(id);

        if (this.isPlatformServer) {
          await Promise.all([getVideoDetail$, getRecommendedVideos$]);
          this.setTransferredState(new VideoDetailState(
            this.video, this.videoFound, this.recommendedVideos
          ));
        } else {
          getVideoDetail$.then(success => success && this._store.dispatch(new LoaderCommands.Hide()));
        }
      } else {
        this.patchTransferredState(this);
        isBrowser && this._store.dispatch(new LoaderCommands.Hide());
      }
    });
  }

  private _getVideoDetail(id: string) {
    return this._store.dispatch(new VideoQueries.GetDetail(id))
      .pipe(withLatestFrom(this._video$))
      .toPromise()
      .then(([_, video]) => {
        if (video) {
          this.video = cloneDeep(video);
          return true;
        }

        const isBrowser = !this.isPlatformServer;
        const getVideoDetailState = this._store.selectSnapshot(CurrentWatchingVideoState.getVideoDetailState);

        // [TODO] Handle errors
        switch (getVideoDetailState) {
          case GET_VIDEO_DETAIL_STATES.notFound: {
            !isBrowser && console.log('Video not found');
            this.videoFound = false;
            this._store.dispatch(new GlobalCommands.ChangeAppStatus(APP_STATUS_STATES.pageNotFound));
          } break;
          default: {
            if (isBrowser) this._nzMessageService.error('[TODO] Unknown error');
            else console.log('[TODO] Unknown error');
          } break;
        }
        return false;
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
    public videoFound: boolean = true,
    public recommendedVideos: VideoViewModel[] = [],
  ) {
  }
}