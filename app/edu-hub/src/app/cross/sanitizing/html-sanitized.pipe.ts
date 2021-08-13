import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlSanitized'
})
export class HtmlSanitizedPipe implements PipeTransform {

  constructor(private _domSanitizer: DomSanitizer) { }

  transform(value: string, ...args: unknown[]): SafeHtml {
    return this._domSanitizer.bypassSecurityTrustHtml(value);
  }

}
