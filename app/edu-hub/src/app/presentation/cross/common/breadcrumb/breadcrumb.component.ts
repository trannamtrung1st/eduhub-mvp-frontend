import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { RoutingData } from '@presentation/cross/routing/models/routing-data.model';
import { BreadcrumbModel } from './models/breadcrumb.model';

import { RoutingService } from '@cross/routing/routing.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() prefix: string[];

  breadcrumbs: BreadcrumbModel[];

  constructor(private _activatedRoute: ActivatedRoute,
    private _routingService: RoutingService) {
    this.prefix = [];
    this.breadcrumbs = [];
  }

  ngOnInit(): void {
    let currentRoute: ActivatedRouteSnapshot | null = this._activatedRoute.snapshot;
    let activeRouteFound = false;

    while (currentRoute) {
      const routingData = currentRoute.routeConfig?.data as RoutingData;

      if (routingData && routingData.breadcrumb) {
        const url = '/' + currentRoute.pathFromRoot
          .map(route => route.routeConfig?.path)
          .filter(path => !!path).join('/');
        const exists = this.breadcrumbs.some(breadcrumb => breadcrumb.url == url);

        if (!exists) {
          const isActive: boolean = !activeRouteFound && this._routingService.isActive(url, false);
          activeRouteFound = activeRouteFound || isActive;

          this.breadcrumbs.unshift(new BreadcrumbModel(
            routingData, url, isActive
          ));
        }
      }

      currentRoute = currentRoute.parent;
    }
  }

}
