import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-half-collapsed-section',
  templateUrl: './half-collapsed-section.component.html',
  styleUrls: ['./half-collapsed-section.component.scss']
})
export class HalfCollapsedSectionComponent implements OnInit, AfterViewChecked {

  @ViewChild('content', { static: true }) private _sectionContentRef!: ElementRef<HTMLElement>;

  @Input() colHeight!: string;
  @Input() overlayHeight: string;
  @Input() expanderBottom: string;

  overlayClass: any;
  contentStyle: any;
  overlayStyle: any;
  expanderStyle: any;
  expanded: boolean;
  overflow: boolean;

  private _contentHeight: number;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    this.expanded = false;
    this.overflow = false;
    this.overlayHeight = '50%';
    this.expanderBottom = '-27px';
    this._contentHeight = 0;
  }

  ngAfterViewChecked(): void {
    const contentEl = this._sectionContentRef.nativeElement;
    this._contentHeight = contentEl.offsetHeight;
    const lastOverflow = this.overflow;
    this.overflow = this._contentHeight >= +this.colHeight;

    if (this.overflow && !lastOverflow) {
      this.overlayClass['edh-content-overlay--show'] = true;
      this._changeDetectorRef.detectChanges();
    }
  }

  ngOnInit(): void {
    this.contentStyle = {
      maxHeight: `${this.colHeight}px`
    };
    this.overlayStyle = {
      height: this.overlayHeight
    };
    this.expanderStyle = {
      bottom: this.expanderBottom
    };
    this.overlayClass = {
      'edh-content-overlay': true,
      'edh-content-overlay--show': false
    };
  }

  toggle() {
    this.expanded = !this.expanded;
    this.contentStyle.maxHeight = this.expanded ? `${this._contentHeight}px` : `${this.colHeight}px`;
  }

}
