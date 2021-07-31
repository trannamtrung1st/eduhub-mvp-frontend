import { AfterContentChecked, AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { NgScrollbar } from 'ngx-scrollbar';
declare let $: any;

import { fading, VisibilityController } from '@cross/animation/animation-helper';

import { GlobalStoreService } from '@core/global/global-store.service';

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.scss'],
  animations: [
    fading(),
  ]
})
export class NormalLayoutComponent implements OnInit, AfterViewInit, AfterContentChecked {

  @ViewChild(NgScrollbar) private _scrollbarRef?: NgScrollbar;

  loaderVisibility: VisibilityController;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: object,
    private _globalStoreService: GlobalStoreService
  ) {
    this.loaderVisibility = new VisibilityController();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._initMagnificPopup();
    }
  }

  ngAfterViewInit(): void {
    this._globalStoreService.pageScrollBar = this._scrollbarRef;

    if (this._scrollbarRef) {
      this._scrollbarRef.scrolled.subscribe(this._onPageScrolled);
    }
  }

  ngAfterContentChecked(): void {
    this.loaderVisibility.hide();
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

  private _initMagnificPopup() {
    const magnifPopup = function () {
      $('.image-popup').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-with-zoom',
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300,
          easing: 'ease-in-out',
          opener: function (openerElement: any) {
            return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        }
      });
    };

    const magnifVideo = function () {
      $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
    };

    magnifPopup();
    magnifVideo();
  }

}
