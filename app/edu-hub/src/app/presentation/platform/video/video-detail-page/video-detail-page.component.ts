import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { APP_STATUS_STATES } from '@core/global/states/global.state';
import { COMMENTS } from '@domains/comment/constants';

import { GlobalCommands } from '@core/global/commands/global.commands';
import { VideoDetailModel } from '@core/video/models/video-detail.model';
import { VideoDetailViewModel } from './view-model/video-detail-view.model';
import { VideoQueries } from '@core/video/queries/video.queries';
import { LoaderCommands } from '@core/global/commands/loader.commands';
import { VideoModel } from '@core/video/models/video.model';
import { VideoViewModel } from '../video-list-item/view-models/video-view.model';

import { CurrentWatchingVideoState, GET_VIDEO_DETAIL_STATES } from '@core/video/states/current-watching-video.state';
import { VideoListState } from '@core/video/states/video-list.state';

import { BaseComponent } from '@presentation/cross/base-component/base-component';

@Component({
  selector: 'app-video-detail-page',
  templateUrl: './video-detail-page.component.html',
  styleUrls: ['./video-detail-page.component.scss']
})
export class VideoDetailPageComponent extends BaseComponent<VideoDetailState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = VideoDetailPageComponent.name;

  video: VideoDetailViewModel;
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
    private _route: ActivatedRoute) {
    super(platformId, transferState);
    this.video = new VideoDetailViewModel();
    this.recommendedVideos = [];
    this.videoFound = true;
    this.currentComment = '';
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    this._route.params.subscribe(params => {
      const id = params['id'];

      if (isBrowser) {
        const pageEl = document.querySelector('html') as HTMLElement;
        pageEl.scrollTop = 0;
        this._store.dispatch(new LoaderCommands.Reset());
      }

      this._getVideoDetail(id);
      this._getRecommendedVideos(id);
    });

    if (this.needInitData) {
      this.isPlatformServer && this.setTransferredState(new VideoDetailState(
        this.video, this.videoFound, this.recommendedVideos
      ));
    } else {
      this.patchTransferredState(this);
      isBrowser && this._store.dispatch(new LoaderCommands.Hide());
    }
  }

  private _getVideoDetail(id: string) {
    this._store.dispatch(new VideoQueries.GetDetail(id))
      .pipe(withLatestFrom(this._video$))
      .subscribe(([_, video]) => {
        const isBrowser = !this.isPlatformServer;

        if (video) {
          this.video = cloneDeep(video);
          isBrowser && this._store.dispatch(new LoaderCommands.Hide());
        } else {
          const getVideoDetailState = this._store.selectSnapshot(CurrentWatchingVideoState.getVideoDetailState);

          // [TODO] Handle errors
          switch (getVideoDetailState) {
            case GET_VIDEO_DETAIL_STATES.notFound: {
              !isBrowser && console.log('Video not found');
              this.videoFound = false;
              this._store.dispatch(new GlobalCommands.ChangeAppStatus(APP_STATUS_STATES.pageNotFound));
            } break;
            default: {
              isBrowser && alert('Unknown error') ||
                console.log('Unknown error');
            } break;
          }
        }
      });
  }

  private _getRecommendedVideos(id: string) {
    const query = new VideoQueries.GetRecommended(id);

    this._store.dispatch(query)
      .pipe(withLatestFrom(this._recommendedVideos$))
      .subscribe(([_, videos]) => {
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