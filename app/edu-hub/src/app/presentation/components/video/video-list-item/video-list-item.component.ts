import { Component, Input, OnInit } from '@angular/core';

import { A_ROUTING } from '@app/constants';

import { VideoViewModel } from './view-models/video-view.model';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.scss']
})
export class VideoListItemComponent implements OnInit {

  @Input() video!: VideoViewModel;

  constructor() {
  }

  ngOnInit(): void {
    this.video.detailUrl = A_ROUTING.videoDetail.replace(':id', this.video.id);
  }

}
