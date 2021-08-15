import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { CrossModule as PresentationCrossModule } from './cross/cross.module';

import { PageNotFoundComponent } from './cross/pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    PresentationCrossModule
  ],
  exports: [
    PageNotFoundComponent
  ]
})
export class PresentationModule { }
