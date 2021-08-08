import { Component, Input, OnInit } from '@angular/core';

import { PostViewModel } from './view-models/post-view.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: PostViewModel;
  @Input() tmbWidth: number | string;
  @Input() aspectRatio: number | string;
  @Input() maxDescriptionHeight: number | string;
  @Input() infoWidth: string;

  tmbStyle: any;
  infoStyle: any;

  constructor() {
    this.tmbWidth = 300;
    this.aspectRatio = 16 / 9;
    this.maxDescriptionHeight = 50;
    this.infoWidth = '';
  }

  ngOnInit(): void {
    this.tmbStyle = {
      width: `${this.tmbWidth}px`,
      height: `${+this.tmbWidth / +this.aspectRatio}px`
    };
    this.infoStyle = {
      width: this.infoWidth,
    };
  }

}
