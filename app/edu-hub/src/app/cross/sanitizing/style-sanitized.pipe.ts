import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'styleSanitized'
})
export class StyleSanitizedPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) { }

  transform(value: string, ...args: unknown[]): SafeStyle {
    return this._domSanitizer.bypassSecurityTrustStyle(value);
  }

}
