import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let $: any;

import { fading, VisibilityController } from '@cross/animation/animation-helper';

import { GlobalService } from '@core/global/services/global.service';

@Component({
  selector: 'app-normal-layout',
  templateUrl: './normal-layout.component.html',
  styleUrls: ['./normal-layout.component.scss'],
  animations: [
    fading(),
  ]
})
export class NormalLayoutComponent implements OnInit {

  loaderVisibility: VisibilityController;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: object,
    private _globalService: GlobalService
  ) {
    this.loaderVisibility = new VisibilityController();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.loaderVisibility.hide();
      this._initMagnificPopup();
    }
  }

  onGoToTopClicked(event: MouseEvent) {
    event.preventDefault();
    const pageEl = document.querySelector('html') as HTMLElement;
    const offsetTop = pageEl.offsetTop;
    this._globalService.scrollManager.scrollTo(pageEl, {
      top: offsetTop,
      duration: 500
    });
    return false;
  }

  onPageScrolled(_: any) {
    const btnGoToTop = document.querySelector('.gototop.js-top');
    const pageEl = document.querySelector('html') as HTMLElement;

    if (pageEl.scrollTop > 200) {
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
