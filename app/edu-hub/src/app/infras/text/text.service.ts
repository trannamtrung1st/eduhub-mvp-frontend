import { Injectable } from '@angular/core';

import shave from 'shave';

import { DEFAULT_TEXT_ELLIPSIS_SELECTOR } from './constants';

import { InfrasModule } from '@infras/infras.module';

@Injectable({
  providedIn: InfrasModule
})
export class TextService {

  constructor() { }

  initTextEllipsis(maxHeight: number, selector: string = DEFAULT_TEXT_ELLIPSIS_SELECTOR) {
    shave(selector, maxHeight);
  }
}
