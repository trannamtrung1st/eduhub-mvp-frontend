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
  @Input() tmbWidth: number | string;
  @Input() aspectRatio: number;
  @Input() infoWidth: string;

  tmbStyle: any;
  infoStyle: any;

  constructor() {
    this.tmbWidth = 300;
    this.aspectRatio = 16 / 9;
    this.infoWidth = '';
  }

  ngOnInit(): void {
    this.video.detailUrl = A_ROUTING.videoDetail.replace(':id', this.video.id);
    this.tmbStyle = {
      width: `${this.tmbWidth}px`,
      height: `${+this.tmbWidth / this.aspectRatio}px`
    };
    this.infoStyle = {
      width: this.infoWidth,
    };
  }

}
