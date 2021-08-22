import { Component, Input, OnInit } from '@angular/core';

import { A_ROUTING } from '@app/constants';

import { BlogViewModel } from './view-models/blog-view.model';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent implements OnInit {

  @Input() blog!: BlogViewModel;
  @Input() tmbFullWidth: boolean;
  @Input() tmbWidth: number | string;
  @Input() aspectRatio: number | string;
  @Input() maxDescriptionHeight: number | string;
  @Input() infoWidth: string;

  tmbStyle: any;
  infoStyle: any;

  constructor() {
    this.tmbFullWidth = false;
    this.tmbWidth = 300;
    this.aspectRatio = 16 / 9;
    this.maxDescriptionHeight = 50;
    this.infoWidth = '';
  }

  ngOnInit(): void {
    this.blog.detailUrl = this.blog.detailUrl || A_ROUTING.platform.blog.detail.replace(':id', this.blog.id);
    this.tmbStyle = {
      width: `${this.tmbWidth}px`,
      height: `${+this.tmbWidth / +this.aspectRatio}px`
    };
    this.infoStyle = {
      width: this.infoWidth,
    };
  }

}
