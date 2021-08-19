import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RoutingData } from '@presentation/auth/routing/models/routing-data.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() extraTemplate!: TemplateRef<any>;

  title?: string;
  subTitle?: string;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe(routingData => {
      let currentData = routingData as RoutingData | undefined;
      this.title = currentData?.title;
      this.subTitle = currentData?.subTitle;
    });
  }

}
