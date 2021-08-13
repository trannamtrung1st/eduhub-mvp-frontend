import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { environment } from '@environments/environment';

import { CoreModule } from '@core/core.module';
import { CrossModule } from '@cross/cross.module';
import { PersistenceModule } from '@persistence/persistence.module';
import { PresentationModule } from '@presentation/presentation.module';
import { PresentationRoutingModule } from '@presentation/presentation-routing.module';
import { InfrasModule } from '@infras/infras.module';

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
    NgxsRouterPluginModule.forRoot(),
    PresentationRoutingModule,
    CrossModule,
    CoreModule,
    PresentationModule,
    PersistenceModule,
    InfrasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
