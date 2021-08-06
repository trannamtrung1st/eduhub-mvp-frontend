import { Component, Input, OnInit } from '@angular/core';

import { PostViewModel } from './view-models/post-view.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() post!: PostViewModel;

  constructor() { }

  ngOnInit(): void {
  }

}
