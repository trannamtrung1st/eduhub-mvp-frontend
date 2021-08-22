import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { CrossModule as PresentationCrossModule } from './cross/cross.module';

import { markedOptionsFactory } from '@cross/markdown/marked-options';

import { PageNotFoundComponent } from './cross/pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    }),
    PresentationCrossModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PresentationModule { }
