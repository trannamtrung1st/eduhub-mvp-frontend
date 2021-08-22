import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlSanitizedPipe } from './sanitizing/html-sanitized.pipe';
import { StyleSanitizedPipe } from './sanitizing/style-sanitized.pipe';

@NgModule({
  declarations: [
    HtmlSanitizedPipe,
    StyleSanitizedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HtmlSanitizedPipe,
    StyleSanitizedPipe
  ]
})
export class CrossModule { }
