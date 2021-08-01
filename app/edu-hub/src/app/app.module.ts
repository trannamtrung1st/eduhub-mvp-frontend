import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsModule } from '@ngxs/store';

import { environment } from '@environments/environment';

import { CoreModule } from '@core/core.module';
import { CrossModule } from '@cross/cross.module';
import { PersistenceModule } from '@persistence/persistence.module';
import { PresentationModule } from '@presentation/presentation.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'edu-hub' }),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    AppRoutingModule,
    CrossModule,
    CoreModule,
    PresentationModule,
    PersistenceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
