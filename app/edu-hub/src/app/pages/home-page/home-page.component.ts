import { Component, OnInit } from '@angular/core';

import { cloneDeep } from 'lodash';
import { getEnumByKey } from '@app/helpers/enum-helper';

import { VideoFilterSortBy } from '@app/domains/video/constants';
import { PostFilterSortBy } from '@app/domains/post/constants';

import { PaginationModel } from '@cross/pagination/models/pagination.model';
import { SubjectViewModel } from './view-models/subject-view.model';
import { PostViewModel } from './view-models/post-view.model';
import { VideoViewModel } from './view-models/video-view.model';
import { FilterViewModel } from './view-models/filter-view.model';
import { VideoFilterRequestModel } from '@app/domains/video/models/video-filter-request.model';
import { PostFilterRequestModel } from '@app/domains/post/models/post-filter-request.model';
import { CONTENT_SORT_BY, SortByViewModel } from './view-models/sort-by.model';

import { SubjectService } from '@app/domains/subject/services/subject.service';
import { VideoService } from '@app/domains/video/services/video.service';
import { PostService } from '@app/domains/post/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  videos: VideoViewModel[];
  posts: PostViewModel[];
  subjects: SubjectViewModel[];

  postPaging: PaginationModel;
  videoPaging: PaginationModel;
  filterModel: FilterViewModel;

  sortByValues = CONTENT_SORT_BY;

  constructor(private _subjectService: SubjectService,
    private _videoService: VideoService,
    private _postService: PostService) {
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

  // Handlers
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
    this.filterModel.subjects = this.subjects.filter(subject => subject.selected)
      .map(subject => subject.id);
    this._getVideos();
    this._getPosts();
  }

  onVideoPagingChanged(pageNumber: number) {
    this.videoPaging.current = pageNumber;
    this._getVideos(true);
  }

  onPostPagingChanged(pageNumber: number) {
    this.postPaging.current = pageNumber;
    this._getPosts(true);
  }

  // Business
  private _getAllSubjects() {
    this._subjectService.getAll().subscribe(subjects => {
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

    const clonedRequestModel: any = cloneDeep(this.filterModel);
    const requestModel = clonedRequestModel as VideoFilterRequestModel;
    requestModel.skip = this.videoPaging.skip;
    requestModel.take = this.videoPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      requestModel.sortBy = getEnumByKey(VideoFilterSortBy, sortBy);
      requestModel.isDesc = isDesc;
    }

    this._videoService.filter(requestModel).subscribe(filterResponse => {
      this.videos = filterResponse.records.map(video => cloneDeep(video));
      this.videoPaging.totalRecords = filterResponse.totalRecords;
    });
  }

  private _getPosts(isUpdatePaging: boolean = false) {
    if (!isUpdatePaging) {
      this.postPaging.current = 1;
    }

    const clonedRequestModel: any = cloneDeep(this.filterModel);
    const requestModel = clonedRequestModel as PostFilterRequestModel;
    requestModel.skip = this.postPaging.skip;
    requestModel.take = this.postPaging.pageSize;

    if (this.filterModel.sortByModel) {
      const { sortBy, isDesc } = this.filterModel.sortByModel;
      requestModel.sortBy = getEnumByKey(PostFilterSortBy, sortBy);
      requestModel.isDesc = isDesc;
    }

    this._postService.filter(requestModel).subscribe(filterResponse => {
      this.posts = filterResponse.records.map(post => cloneDeep(post));
      this.postPaging.totalRecords = filterResponse.totalRecords;
    });
  }
}
