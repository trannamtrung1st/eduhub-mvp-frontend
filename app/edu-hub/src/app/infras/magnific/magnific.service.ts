import { Injectable } from '@angular/core';

declare let $: any;

import { InfrasModule } from '@infras/infras.module';

@Injectable({
  providedIn: InfrasModule
})
export class MagnificService {

  constructor() { }

  initMagnificPopup() {
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
