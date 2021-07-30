import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(NgScrollbar) private _scrollbarRef?: NgScrollbar;

  title = 'edu-hub';

  constructor() {
  }

  ngAfterViewInit(): void {
    if (this._scrollbarRef) {
      this._scrollbarRef.scrolled.subscribe(this._onPageScrolled);
    }
  }

  onGoToTopClicked(event: MouseEvent) {
    event.preventDefault();
    const offsetTop = document.querySelector('html')?.offsetTop;
    this._scrollbarRef?.scrollTo({
      top: offsetTop,
      duration: 500
    });
    return false;
  }

  private _onPageScrolled(scrollEvent: any) {
    const pageTarget = scrollEvent.target;
    const scrollTop = pageTarget.scrollTop;
    const btnGoToTop = document.querySelector('.gototop.js-top');
    if (scrollTop > 200) {
      btnGoToTop?.classList.add('active');
    } else {
      btnGoToTop?.classList.remove('active');
    }
  }
}
