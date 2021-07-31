import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { cloneDeep } from 'lodash';

import { CONTENT_SORT_BY } from './view-models/constants';

import { getEnumByKey } from '@cross/enum/enum-helper';

import { SubjectViewModel } from './view-models/subject-view.model';
import { PostViewModel } from './view-models/post-view.model';
import { VideoViewModel } from './view-models/video-view.model';
import { FilterViewModel } from './view-models/filter-view.model';
import { SortByViewModel } from './view-models/sort-by.model';
import { PaginationModel } from '@cross/pagination/models/pagination.model';
import { GetAllSubjectQuery } from '@core/subject/queries/get-all-subject.query';
import { VideoFilterQuery } from '@core/video/queries/video-filter.query';
import { VideoFilterSortBy } from '@core/video/constants';
import { PostFilterQuery } from '@core/post/queries/post-filter.query';
import { PostFilterSortBy } from '@core/post/constants';

import { SubjectService } from '@core/subject/services/subject.service';
import { VideoService } from '@core/video/services/video.service';
import { PostService } from '@core/post/services/post.service';
import { GlobalStoreService } from '@core/global/global-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild("videoGoTo") private _videoGoToRef?: ElementRef;
  @ViewChild("postGoTo") private _postGoToRef?: ElementRef;

  videos: VideoViewModel[];
  posts: PostViewModel[];
  subjects: SubjectViewModel[];

  postPaging: PaginationModel;
  videoPaging: PaginationModel;
  filterModel: FilterViewModel;

  CONTENT_SORT_BY = CONTENT_SORT_BY;

  constructor(private _subjectService: SubjectService,
    private _videoService: VideoService,
    private _postService: PostService,
    private _globalStoreService: GlobalStoreService) {
    this.subjects = [];
    this.videos = [];
    this.posts = [];
    this.videoPaging = new PaginationModel();
    this.postPaging = new PaginationModel();
    this.filterModel = new FilterViewModel();
  }

  ngOnInit(): void {
    this._getAllSubjects();
    this._getVideos();
    this._getPosts();
  }

  onSortChanged(sortByModel: SortByViewModel) {
    this.filterModel.sortByModel = sortByModel;
    this._getVideos();
    this._getPosts();
  }

  onSearchClicked(_: any) {
    this._getVideos();
    this._getPosts();
  }

  onSubjectSelectionChanged(_: SubjectViewModel) {
    this._scrollTo(this._videoGoToRef);
    this.filterModel.subjects = this.subjects.filter(subject => subject.selected)
      .map(subject => subject.id);
    this._getVideos();
    this._getPosts();
  }

  onVideoPagingChanged(pageNumber: number) {
    this._scrollTo(this._videoGoToRef);
    this.videoPaging.current = pageNumber;
    this._getVideos(true);
  }

  onPostPagingChanged(pageNumber: number) {
    this._scrollTo(this._postGoToRef);
    this.postPaging.current = pageNumber;
    this._getPosts(true);
  }

  private _getAllSubjects() {
    const query = new GetAllSubjectQuery();
    this._subjectService.getAll(query).subscribe(subjects => {
      this.subjects = subjects.map(subject => {
        const clonedSubject = cloneDeep(subject) as SubjectViewModel;
        clonedSubject.selected = false;
        return clonedSubject;
      });
    });
  }

  private _getVideos(isUpdatePaging: boolean = false) {
    if (!isUpdatePaging) {
      this.videoPaging.current = 1;
    }

    const clonedFilterModel: any = cloneDeep(this.filterModel);
    const query = clonedFilterModel as VideoFilterQuery;
    query.skip = this.videoPaging.skip;
    query.take = this.videoPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      query.sortBy = getEnumByKey(VideoFilterSortBy, sortBy);
      query.isDesc = isDesc;
    }

    this._videoService.filter(query).subscribe(filterResponse => {
      this.videos = filterResponse.records.map(video => cloneDeep(video));
      this.videoPaging.totalRecords = filterResponse.totalRecords;
    });
  }

  private _getPosts(isUpdatePaging: boolean = false) {
    if (!isUpdatePaging) {
      this.postPaging.current = 1;
    }

    const clonedFilterModel: any = cloneDeep(this.filterModel);
    const query = clonedFilterModel as PostFilterQuery;
    query.skip = this.postPaging.skip;
    query.take = this.postPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      query.sortBy = getEnumByKey(PostFilterSortBy, sortBy);
      query.isDesc = isDesc;
    }

    this._postService.filter(query).subscribe(filterResponse => {
      this.posts = filterResponse.records.map(post => cloneDeep(post));
      this.postPaging.totalRecords = filterResponse.totalRecords;
    });
  }

  private _scrollTo(elementRef: ElementRef | undefined) {
    const scrollBar = this._globalStoreService.pageScrollBar;
    const goToElement = elementRef?.nativeElement as HTMLElement;
    const offsetParent = goToElement.offsetParent as HTMLElement;
    const nav = document.querySelector('.edh-nav') as HTMLElement;
    scrollBar?.scrollTo({
      top: offsetParent.offsetTop + goToElement.offsetTop - nav.offsetHeight - goToElement.clientHeight
    });
  }
}
