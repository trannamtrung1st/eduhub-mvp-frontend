import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { APP_STATUS_STATES } from '@core/global/states/global.state';

import { GlobalCommands } from '@core/global/commands/global.commands';
import { VideoDetailModel } from '@core/video/models/video-detail.model';
import { VideoQueries } from '@core/video/queries/video.queries';
import { LoaderCommands } from '@core/global/commands/loader.commands';

import { CurrentWatchingVideoState, GET_VIDEO_DETAIL_STATES } from '@core/video/states/current-watching-video.state';

import { BaseComponent } from '@presentation/components/cross/base-component/base-component';

@Component({
  selector: 'app-video-detail-page',
  templateUrl: './video-detail-page.component.html',
  styleUrls: ['./video-detail-page.component.scss']
})
export class VideoDetailPageComponent extends BaseComponent<VideoDetailState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = VideoDetailPageComponent.name;

  video?: VideoDetailModel;
  videoFound: boolean;

  @Select(CurrentWatchingVideoState.video) _video$!: Observable<VideoDetailModel>;
  @Select(CurrentWatchingVideoState.getVideoDetailState) _getVideoDetailState$!: Observable<string>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _route: ActivatedRoute) {
    super(platformId, transferState);
    this.videoFound = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.needInitData) {
      this._route.params.subscribe(params => {
        const id = params['id'];
        this._getVideoDetail(id);
      });

      this.isPlatformServer && this.setTransferredState(new VideoDetailState(
        this.video, this.videoFound
      ));
    } else {
      this.patchTransferredState(this);
    }

    isBrowser && this._store.dispatch(new LoaderCommands.Hide());
  }

  private _getVideoDetail(id: string) {
    this._store.dispatch(new VideoQueries.GetDetail(id))
      .pipe(withLatestFrom(this._video$))
      .subscribe(([_, video]) => {
        this.video = video;

        if (!video) {
          const getVideoDetailState = this._store.selectSnapshot(CurrentWatchingVideoState.getVideoDetailState);
          const isBrowser = !this.isPlatformServer;

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

}

class VideoDetailState {

  constructor(
    public video?: VideoDetailModel,
    public videoFound: boolean = true
  ) {
  }
}