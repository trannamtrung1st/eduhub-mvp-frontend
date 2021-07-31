import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNavDropdown]'
})
export class NavDropdownDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this._showDropdown();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._hideDropdown();
  }

  private _showDropdown() {
    const element = this._el.nativeElement as HTMLElement;
    const dropdown = element.querySelector('.dropdown');
    dropdown?.classList.add('animated-fast', 'fadeInUpMenu', 'd-block');
  }

  private _hideDropdown() {
    const element = this._el.nativeElement as HTMLElement;
    const dropdown = element.querySelector('.dropdown');
    dropdown?.classList.remove('animated-fast', 'fadeInUpMenu', 'd-block');
    dropdown?.classList.add('d-none');
  }

}
