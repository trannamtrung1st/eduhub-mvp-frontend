import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

import { LoaderCommands } from '@core/global/commands/loader.commands';
import { VideoModel } from '@core/video/models/video.model';
import { VideoViewModel } from '@presentation/cross/video/video-list-item/view-models/video-view.model';
import { VideoQueries } from '@core/video/queries/video.queries';
import { BlogModel } from '@core/blog/models/blog.model';
import { BlogViewModel } from '@presentation/cross/blog/blog-list-item/view-models/blog-view.model';
import { BlogQueries } from '@core/blog/queries/blog.queries';

import { VideoListState } from '@core/video/states/video-list.state';
import { BlogListState } from '@core/blog/states/blog-list.state';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';
import { A_ROUTING } from '@app/constants';

@Component({
  selector: 'app-medias-page',
  templateUrl: './medias-page.component.html',
  styleUrls: ['./medias-page.component.scss']
})
export class MediasPageComponent extends BaseComponent<MediasState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = MediasPageComponent.name;

  videos: VideoViewModel[];
  blogs: BlogViewModel[];

  @Select(VideoListState.randomVideos) private _videos$!: Observable<VideoModel[]>;
  @Select(BlogListState.randomBlogs) private _blogs$!: Observable<BlogModel[]>;

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

    this._store.dispatch(new LoaderCommands.Hide());
  }

  private _getVideos() {
    return this._store.dispatch(new VideoQueries.GetRandomList())
      .pipe(withLatestFrom(this._videos$))
      .toPromise()
      .then(([_, videos]) => {
        this.videos = videos.map(video => {
          const videoModel = cloneDeep(video) as VideoViewModel;
          videoModel.detailUrl = A_ROUTING.management.medias.videoDetail.replace(':id', videoModel.id);
          return videoModel;
        });
      });
  }

  private _getBlogs() {
    return this._store.dispatch(new BlogQueries.GetRandomList())
      .pipe(withLatestFrom(this._blogs$))
      .toPromise()
      .then(([_, blogs]) => {
        this.blogs = blogs.map(blog => {
          const blogModel = cloneDeep(blog) as BlogViewModel;
          blogModel.detailUrl = A_ROUTING.management.medias.blogDetail.replace(':id', blogModel.id);
          return blogModel;
        });
      });
  }
}

class MediasState {
}