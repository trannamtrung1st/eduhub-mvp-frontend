import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { browserStorageFactory, BROWSER_STORAGE } from './browser/constants';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: BROWSER_STORAGE, useFactory: browserStorageFactory, deps: [PLATFORM_ID] }
  ]
})
export class PersistenceModule { }
