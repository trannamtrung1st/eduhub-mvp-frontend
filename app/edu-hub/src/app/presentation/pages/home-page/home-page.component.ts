import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { cloneDeep } from 'lodash';
import { withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { CONTENT_SORT_BY } from './constants';
import { VideoFilterSortBy } from '@core/video/constants';
import { PostFilterSortBy } from '@core/post/constants';

import { getEnumByKey } from '@cross/enum/enum-helper';

import { SubjectViewModel } from './view-models/subject-view.model';
import { PostViewModel } from './view-models/post-view.model';
import { VideoViewModel } from './view-models/video-view.model';
import { FilterViewModel } from './view-models/filter-view.model';
import { FormInputViewModel } from './view-models/form-input-view.model';
import { SortByViewModel } from './view-models/sort-by.model';
import { PaginationModel } from '@cross/pagination/models/pagination.model';
import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { SubjectModel } from '@core/subject/models/subject.model';
import { SubjectQueries } from '@core/subject/queries/subject.queries';
import { VideoQueries } from '@core/video/queries/video.queries';
import { VideoModel } from '@core/video/models/video.model';
import { PostQueries } from '@core/post/queries/post.queries';
import { PostModel } from '@core/post/models/post.model';
import { LoaderCommands } from '@core/global/commands/loader.commands';

import { AllSubjectsState } from '@core/subject/states/all-subjects.state';
import { FilteredVideosState } from '@core/video/states/filtered-videos.state';
import { FilteredPostsState } from '@core/post/states/filtered-posts.state';

import { BaseComponent } from '@presentation/components/cross/base-component/base-component';

import { ScrollingService } from '@infras/scrolling/scrolling.service';
import { MagnificService } from '@infras/magnific/magnific.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BaseComponent<HomePageState> implements OnInit, OnDestroy {

  @ViewChild("videoGoTo") private _videoGoToRef!: ElementRef;
  @ViewChild("postGoTo") private _postGoToRef!: ElementRef;

  CONTENT_SORT_BY = CONTENT_SORT_BY;

  protected transferStateKeyName: string = HomePageComponent.name;

  videos: VideoViewModel[];
  posts: PostViewModel[];
  subjects: SubjectViewModel[];

  postPaging: PaginationModel;
  videoPaging: PaginationModel;
  filterModel: FilterViewModel;
  formInputModel: FormInputViewModel;

  @Select(AllSubjectsState.subjects) _subjects$!: Observable<SubjectModel[]>;
  @Select(AllSubjectsState.subjectNames) _subjectNames$!: Observable<string>;
  @Select(FilteredVideosState.videos) _videos$!: Observable<FilterResponseModel<VideoModel>>;
  @Select(FilteredPostsState.posts) _posts$!: Observable<FilterResponseModel<PostModel>>;

  constructor(@Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _scrollingService: ScrollingService,
    private _magnificService: MagnificService) {
    super(platformId, transferState);
    this.subjects = [];
    this.videos = [];
    this.posts = [];
    this.videoPaging = new PaginationModel();
    this.postPaging = new PaginationModel();
    this.filterModel = new FilterViewModel();
    this.formInputModel = new FormInputViewModel();
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.needInitData) {
      this._getAllSubjects();
      this._getVideos();
      this._getPosts();

      this.isPlatformServer && this.setTransferredState(new HomePageState(
        this.videos,
        this.posts,
        this.subjects));
    } else {
      this.patchTransferredState(this);
    }

    // [TODO]: demo only, need manual unsubscription
    this.subscriptions.push(this._subjectNames$.subscribe(subjectNames => console.log(subjectNames)));

    if (isBrowser) {
      this._magnificService.initMagnificPopup();
      this._store.dispatch(new LoaderCommands.Hide());
    }
  }

  onSortChanged(sortByModel: SortByViewModel) {
    this.filterModel.sortByModel = sortByModel;
    this.videoPaging.current = 1;
    this.postPaging.current = 1;
    this._getVideos();
    this._getPosts();
  }

  onSearchClicked(_: any) {
    this.videoPaging.current = 1;
    this.postPaging.current = 1;
    Object.assign(this.filterModel, this.formInputModel);
    this._getVideos();
    this._getPosts();
  }

  onSubjectSelectionChanged(_: SubjectViewModel) {
    this._scrollTo(this._videoGoToRef);
    this.filterModel.subjects = this.subjects.filter(subject => subject.selected)
      .map(subject => subject.id);
    this.videoPaging.current = 1;
    this.postPaging.current = 1;
    this._getVideos();
    this._getPosts();
  }

  onVideoPagingChanged(pageNumber: number) {
    this._scrollTo(this._videoGoToRef);
    this.videoPaging.current = pageNumber;
    this._getVideos();
  }

  onPostPagingChanged(pageNumber: number) {
    this._scrollTo(this._postGoToRef);
    this.postPaging.current = pageNumber;
    this._getPosts();
  }

  private _getAllSubjects() {
    const query = new SubjectQueries.GetAll();
    this._store.dispatch(query)
      .pipe(withLatestFrom(this._subjects$))
      .subscribe(([_, subjects]) => {
        this.subjects = subjects.map(subject => {
          const clonedSubject = cloneDeep(subject) as SubjectViewModel;
          clonedSubject.selected = false;
          return clonedSubject;
        });
      });
  }

  private _getVideos() {
    const clonedFilterModel = cloneDeep(this.filterModel);
    const query = new VideoQueries.Filter();
    Object.assign(query, clonedFilterModel);

    query.skip = this.videoPaging.skip;
    query.take = this.videoPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      query.sortBy = getEnumByKey(VideoFilterSortBy, sortBy);
      query.isDesc = isDesc;
    }

    this._store.dispatch(query)
      .pipe(withLatestFrom(this._videos$))
      .subscribe(([_, videos]) => {
        this.videos = videos.records.map(video => cloneDeep(video));
        this.videoPaging.totalRecords = videos.totalRecords;
      });
  }

  private _getPosts() {
    const clonedFilterModel: any = cloneDeep(this.filterModel);
    const query = new PostQueries.Filter();
    Object.assign(query, clonedFilterModel);
    query.skip = this.postPaging.skip;
    query.take = this.postPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      query.sortBy = getEnumByKey(PostFilterSortBy, sortBy);
      query.isDesc = isDesc;
    }

    this._store.dispatch(query)
      .pipe(withLatestFrom(this._posts$))
      .subscribe(([_, posts]) => {
        this.posts = posts.records.map(post => cloneDeep(post));
        this.postPaging.totalRecords = posts.totalRecords;
      });
  }

  private _scrollTo(elementRef: ElementRef) {
    const pageEl = document.querySelector('html') as HTMLElement;
    const goToElement = elementRef.nativeElement as HTMLElement;
    const offsetParent = goToElement.offsetParent as HTMLElement;
    const nav = document.querySelector('.edh-nav') as HTMLElement;
    this._scrollingService.scrollManager.scrollTo(pageEl, {
      top: offsetParent.offsetTop + goToElement.offsetTop - nav.offsetHeight - goToElement.clientHeight
    });
  }
}

class HomePageState {
  constructor(
    public videos: VideoViewModel[],
    public posts: PostViewModel[],
    public subjects: SubjectViewModel[]
  ) {
  }
}