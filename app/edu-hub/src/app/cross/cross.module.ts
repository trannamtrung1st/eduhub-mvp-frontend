import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HtmlSanitizedPipe } from './sanitizing/html-sanitized.pipe';

@NgModule({
  declarations: [
    HtmlSanitizedPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HtmlSanitizedPipe
  ]
})
export class CrossModule { }
