import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SHARED_PRESENTATION_MODULES } from '@presentation/constants';

import { TopNavComponent } from './top-nav/top-nav.component';
import { LogoComponent } from './logo/logo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { HalfCollapsedSectionComponent } from './half-collapsed-section/half-collapsed-section.component';

import { NavDropdownDirective } from './top-nav/nav-dropdown/nav-dropdown.directive';

@NgModule({
  declarations: [
    TopNavComponent,
    LogoComponent,
    PageNotFoundComponent,
    BannerComponent,
    FooterComponent,
    HalfCollapsedSectionComponent,
    NavDropdownDirective
  ],
  imports: [
    ...SHARED_PRESENTATION_MODULES,
    RouterModule
  ],
  exports: [
    TopNavComponent,
    LogoComponent,
    PageNotFoundComponent,
    BannerComponent,
    FooterComponent,
    HalfCollapsedSectionComponent
  ]
})
export class CrossModule { }
