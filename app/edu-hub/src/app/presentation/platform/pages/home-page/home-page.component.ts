import { AfterViewChecked, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { TransferState } from '@angular/platform-browser';

import { cloneDeep } from 'lodash';
import { withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { CONTENT_SORT_BY } from './constants';
import { VideoFilterSortBy } from '@core/video/constants';
import { BlogFilterSortBy } from '@core/blog/constants';
import { LogoSize } from '@presentation/cross/common/logo/constants';

import { getEnumByKey } from '@cross/enum/enum-helper';

import { SubjectViewModel } from './view-models/subject-view.model';
import { FilterViewModel } from './view-models/filter-view.model';
import { FormInputViewModel } from './view-models/form-input-view.model';
import { SortByViewModel } from './view-models/sort-by.model';
import { PaginationModel } from '@cross/pagination/models/pagination.model';
import { FilterResponseModel } from '@cross/filter/models/filter-response.model';
import { SubjectModel } from '@core/subject/states/models/subject.model';
import { VideoModel } from '@core/video/states/models/video.model';
import { BlogModel } from '@core/blog/states/models/blog.model';
import { VideoViewModel } from '@presentation/cross/video/video-list-item/view-models/video-view.model';
import { BlogViewModel } from '@presentation/cross/blog/blog-list-item/view-models/blog-view.model';
import * as SubjectQueries from '@core/subject/queries/subject.queries';
import * as VideoQueries from '@core/video/queries/video.queries';
import * as BlogQueries from '@core/blog/queries/blog.queries';
import * as CommonCommands from '@core/common/commands/common.commands';

import { BlogState } from '@core/blog/states/blog.state';
import { VideoState } from '@core/video/states/video.state';
import { SubjectState } from '@core/subject/states/subject.state';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

import { ScrollingService } from '@infras/scrolling/scrolling.service';
import { MagnificService } from '@infras/magnific/magnific.service';
import { TextService } from '@infras/text/text.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends BaseComponent<HomePageState> implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild("videoGoTo") private _videoGoToRef!: ElementRef<HTMLElement>;
  @ViewChild("blogGoTo") private _blogGoToRef!: ElementRef<HTMLElement>;

  CONTENT_SORT_BY = CONTENT_SORT_BY;
  LogoSize = LogoSize;

  protected transferStateKeyName: string = HomePageComponent.name;

  videos: VideoViewModel[];
  blogs: BlogViewModel[];
  subjects: SubjectViewModel[];

  blogPaging: PaginationModel;
  videoPaging: PaginationModel;
  filterModel: FilterViewModel;
  formInputModel: FormInputViewModel;

  @Select(SubjectState.subjects) private _subjects$!: Observable<SubjectModel[]>;
  @Select(SubjectState.subjectNames) private _subjectNames$!: Observable<string>;
  @Select(VideoState.filteredVideos) private _videos$!: Observable<FilterResponseModel<VideoModel>>;
  @Select(BlogState.filteredBlogs) private _blogs$!: Observable<FilterResponseModel<BlogModel>>;
  private _blogsReloaded: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _textService: TextService,
    private _scrollingService: ScrollingService,
    private _magnificService: MagnificService) {
    super(platformId, transferState);
    this.subjects = [];
    this.videos = [];
    this.blogs = [];
    this.videoPaging = new PaginationModel();
    this.blogPaging = new PaginationModel();
    this.filterModel = new FilterViewModel();
    this.formInputModel = new FormInputViewModel();
    this._blogsReloaded = false;
  }

  async ngOnInit() {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.shouldLoad) {
      const getAllSubjects$ = this._getAllSubjects();
      const getVideos$ = this._getVideos();
      const getBlogs$ = this._getBlogs();

      if (this.isPlatformServer) {
        await Promise.all([getAllSubjects$, getVideos$, getBlogs$]);
        this.setTransferredState(new HomePageState(
          this.videos,
          this.blogs,
          this.subjects));
      }
    } else {
      this.patchTransferredState(this);
    }

    // [TODO]: demo only, need manual unsubscription
    this.subscriptions.push(this._subjectNames$.subscribe(subjectNames => console.log(subjectNames)));

    if (isBrowser) {
      this._magnificService.initMagnificPopup();
      this._store.dispatch(new CommonCommands.HideLoader());
    }
  }

  ngAfterViewChecked(): void {
    const isBrowser = !this.isPlatformServer;

    if (isBrowser && this._blogsReloaded) {
      this._textService.initTextEllipsis(50, '.edh-blog__description');
      this._blogsReloaded = false;
    }
  }

  onSortChanged(sortByModel: SortByViewModel) {
    this.filterModel.sortByModel = sortByModel;
    this.videoPaging.current = 1;
    this.blogPaging.current = 1;
    this._getVideos();
    this._getBlogs();
  }

  onSearchClicked(_: any) {
    this.videoPaging.current = 1;
    this.blogPaging.current = 1;
    Object.assign(this.filterModel, this.formInputModel);
    this._getVideos();
    this._getBlogs();
  }

  onSearchCleared(_: any) {
    this.videoPaging.current = 1;
    this.blogPaging.current = 1;
    this.filterModel.searchTerm = '';
    this._getVideos();
    this._getBlogs();
  }

  onSubjectSelectionChanged(_: SubjectViewModel) {
    this._scrollTo(this._videoGoToRef);
    this.filterModel.subjects = this.subjects.filter(subject => subject.selected)
      .map(subject => subject.id);
    this.videoPaging.current = 1;
    this.blogPaging.current = 1;
    this._getVideos();
    this._getBlogs();
  }

  onVideoPagingChanged(pageNumber: number) {
    this._scrollTo(this._videoGoToRef);
    this.videoPaging.current = pageNumber;
    this._getVideos();
  }

  onBlogPagingChanged(pageNumber: number) {
    this._scrollTo(this._blogGoToRef);
    this.blogPaging.current = pageNumber;
    this._getBlogs();
  }

  private _getAllSubjects() {
    const query = new SubjectQueries.GetAll();
    return this._store.dispatch(query)
      .pipe(withLatestFrom(this._subjects$))
      .toPromise()
      .then(([_, subjects]) => {
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

    return this._store.dispatch(query)
      .pipe(withLatestFrom(this._videos$))
      .toPromise()
      .then(([_, videos]) => {
        this.videos = videos.records.map(video => cloneDeep(video));
        this.videoPaging.totalRecords = videos.totalRecords;
      });
  }

  private _getBlogs() {
    const clonedFilterModel: any = cloneDeep(this.filterModel);
    const query = new BlogQueries.Filter();
    Object.assign(query, clonedFilterModel);
    query.skip = this.blogPaging.skip;
    query.take = this.blogPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      query.sortBy = getEnumByKey(BlogFilterSortBy, sortBy);
      query.isDesc = isDesc;
    }

    return this._store.dispatch(query)
      .pipe(withLatestFrom(this._blogs$))
      .toPromise()
      .then(([_, blogs]) => {
        this.blogs = blogs.records.map(blog => cloneDeep(blog));
        this.blogPaging.totalRecords = blogs.totalRecords;
        this._blogsReloaded = true;
      });
  }

  private _scrollTo(elementRef: ElementRef<HTMLElement>) {
    const pageEl = document.querySelector('html') as HTMLElement;
    const nav = document.querySelector('.edh-nav') as HTMLElement;
    const goToElement = elementRef.nativeElement;
    const offsetParent = goToElement.offsetParent as HTMLElement;
    this._scrollingService.scrollManager.scrollTo(pageEl, {
      top: offsetParent.offsetTop + goToElement.offsetTop - nav.offsetHeight - goToElement.clientHeight
    });
  }
}

class HomePageState {
  constructor(
    public videos: VideoViewModel[],
    public blogs: BlogViewModel[],
    public subjects: SubjectViewModel[]
  ) {
  }
}