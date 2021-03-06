import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { A_ROUTING } from '@app/constants';

import { VideoModel } from '@core/video/states/models/video.model';
import { VideoViewModel } from '@presentation/cross/video/video-list-item/view-models/video-view.model';
import { BlogModel } from '@core/blog/states/models/blog.model';
import { BlogViewModel } from '@presentation/cross/blog/blog-list-item/view-models/blog-view.model';
import * as BlogQueries from '@core/blog/queries/blog.queries';
import * as VideoQueries from '@core/video/queries/video.queries';
import * as CommonCommands from '@core/common/commands/common.commands';

import { VideoState } from '@core/video/states/video.state';
import { BlogState } from '@core/blog/states/blog.state';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-medias-page',
  templateUrl: './medias-page.component.html',
  styleUrls: ['./medias-page.component.scss']
})
export class MediasPageComponent extends BaseComponent<MediasState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = MediasPageComponent.name;

  A_ROUTING = A_ROUTING;

  videos: VideoViewModel[];
  blogs: BlogViewModel[];

  @Select(VideoState.randomVideos) private _videos$!: Observable<VideoModel[]>;
  @Select(BlogState.randomBlogs) private _blogs$!: Observable<BlogModel[]>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store
  ) {
    super(platformId, transferState);
    this.videos = [];
    this.blogs = [];
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;

    this._getVideos();
    this._getBlogs();

    this._store.dispatch(new CommonCommands.HideLoader());
  }

  private _getVideos() {
    return this._store.dispatch(new VideoQueries.GetRandomList())
      .pipe(withLatestFrom(this._videos$))
      .toPromise()
      .then(([_, videos]) => {
        this.videos = videos.map(video => {
          const videoModel = cloneDeep(video) as VideoViewModel;
          videoModel.detailUrl = A_ROUTING.management.medias.video.detail.replace(':id', videoModel.id);
          return videoModel;
        });
      });
  }

  private _getBlogs() {
    return this._store.dispatch(new BlogQueries.GetRandom())
      .pipe(withLatestFrom(this._blogs$))
      .toPromise()
      .then(([_, blogs]) => {
        this.blogs = blogs.map(blog => {
          const blogModel = cloneDeep(blog) as BlogViewModel;
          blogModel.detailUrl = A_ROUTING.management.medias.blog.detail.replace(':id', blogModel.id);
          return blogModel;
        });
      });
  }
}

class MediasState {
}