import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DEFAULT_IMAGE, MARKDOWN_DOC_URL, MAXIMUM_BLOG_LENGTH } from './constants';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {

  @Input() placeholder?: string;
  @Input() control: FormControl;
  @Input() controlId: string;
  @Input() fontSize: number;

  @ViewChild("editor") private _editorRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild("btnBold") private _btnBoldRef!: any;
  @ViewChild("btnHeading") private _btnHeadingRef!: any;
  @ViewChild("btnItalic") private _btnItalicRef!: any;
  @ViewChild("btnQuote") private _btnQuoteRef!: any;
  @ViewChild("btnCode") private _btnCodeRef!: any;
  @ViewChild("btnLink") private _btnLinkRef!: any;
  @ViewChild("btnImage") private _btnImageRef!: any;
  @ViewChild("btnUList") private _btnUListRef!: any;
  @ViewChild("btnOList") private _btnOListRef!: any;
  @ViewChild("btnUnderline") private _btnUnderlineRef!: any;
  @ViewChild("btnStrike") private _btnStrikeRef!: any;
  @ViewChild("btnSpace") private _btnSpaceRef!: any;
  @ViewChild("btnLineBreak") private _btnLineBreakRef!: any;
  @ViewChild("btnTable") private _btnTableRef!: any;
  @ViewChild("btnHelp") private _btnHelpRef!: any;

  @HostBinding('class.focus') isFocus!: boolean;

  MAXIMUM_BLOG_LENGTH = MAXIMUM_BLOG_LENGTH;

  toolbarLoaded: boolean;

  constructor(@Inject(PLATFORM_ID) private _platformId: object) {
    this.controlId = `edh-md-editor-${Math.floor(100000 * Math.random())}`;
    this.control = new FormControl();
    this.fontSize = 14;
    this.toolbarLoaded = false;
  }

  get content(): string {
    return this._editorRef?.nativeElement.value;
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      import('@github/markdown-toolbar-element').then(_ => this.toolbarLoaded = true);
    }
  }

  onItalicClicked(_: any) {
    this._makeItalic();
  }

  onUnderlineClicked(_: any) {
    this._underline();
  }

  onImageClicked(_: any) {
    this._addImage();
  }

  onStrikeClicked(_: any) {
    this._strike();
  }

  onTableClicked(_: any) {
    this._addTable();
  }

  onSpaceClicked(_: any) {
    this._addPreSpace();
  }

  onHeadingClicked(_: any) {
    this._addHeading();
  }

  onHtmlBreakLineClicked(_: any) {
    this._addHtmlBreakLine();
  }

  onHelpClicked(_: any) {
    this._openHelp();
  }

  onContentKeydown(event: KeyboardEvent) {
    const ctrl = event.ctrlKey;
    const shift = event.shiftKey;
    const alt = event.altKey;
    const isSpecial = ctrl || shift || alt;
    const code = event.code;

    if (ctrl && !shift && !alt) {
      switch (code) {
        case 'KeyB':
          this._btnBoldRef.elementRef.nativeElement.click();
          break;
        case 'KeyI':
          this._btnItalicRef.elementRef.nativeElement.click();
          break;
        case 'KeyU':
          event.preventDefault();
          this._btnUnderlineRef.elementRef.nativeElement.click();
          break;
        case 'KeyG':
          event.preventDefault();
          this._btnImageRef.elementRef.nativeElement.click();
          break;
        case 'KeyL':
          event.preventDefault();
          this._btnLinkRef.elementRef.nativeElement.click();
          break;
        case 'KeyH':
          event.preventDefault();
          this._btnHeadingRef.elementRef.nativeElement.click();
          break;
        case 'Space':
          event.preventDefault();
          this._btnSpaceRef.elementRef.nativeElement.click();
          break;
        case 'Enter':
          event.preventDefault();
          this._btnLineBreakRef.elementRef.nativeElement.click();
          break;
        case 'KeyQ':
          event.preventDefault();
          this._btnQuoteRef.elementRef.nativeElement.click();
          break;
        default: break;
      }
    } else if (alt && !ctrl && !shift) {
      switch (code) {
        case 'KeyS':
          event.preventDefault();
          this._btnStrikeRef.elementRef.nativeElement.click();
          break;
        case 'KeyT':
          event.preventDefault();
          this._btnTableRef.elementRef.nativeElement.click();
          break;
        default: break;
      }
    } else if (!isSpecial) {
      switch (code) {
        case 'Tab':
          event.preventDefault();
          this._tab();
          break;
        case 'F1':
          event.preventDefault();
          this._btnHelpRef.elementRef.nativeElement.click();
          break;
        default: break;
      }
    }
  }

  onContentInput() {
    this._handleContentChanged(this.content);
  }

  onFocus() {
    this.isFocus = true;
  }

  onBlur() {
    this.isFocus = false;
  }

  _handleContentChanged(content: string) {
    if (!this._editorRef) return;
    const editor = this._editorRef.nativeElement;
    if (editor.scrollHeight > 60) {
      editor.style.height = "0px";
      editor.style.height = (editor.scrollHeight + this.fontSize) + "px";
    }
  }

  private _addPreSpace() {
    this._insert('&nbsp;');
  }

  private _addImage() {
    this._insert(`<img src="${DEFAULT_IMAGE}" alt="Some Image" title="Image Title" width="30" height="30"/>`);
  }

  private _addHtmlBreakLine() {
    this._insert(`<br />`);
  }

  private _openHelp() {
    window.open(MARKDOWN_DOC_URL, "_blank");
  }

  private _addHeading() {
    const selection = this._getEditorSelection();
    const selectedContent = this.content.slice(selection.start, selection.end);
    let insertedContent = '';
    const prefix = selection.start === 0 || this.content[selection.start - 1] === '\n' ? '' : '\n';
    if (selection.selected && selectedContent.startsWith('#')) {
      const spaceIdx = selectedContent.indexOf(' ');
      let headingNo = selectedContent.slice(0, spaceIdx).length + 1;
      if (headingNo > 6) headingNo = 1;
      const hashes = [...Array(headingNo).keys()].map(_ => '#').join('');
      insertedContent = `${prefix}${hashes} ${selectedContent.slice(spaceIdx + 1, selectedContent.length)}`;
    } else {
      insertedContent = `${prefix}# ${selectedContent || 'Heading'}`;
    }
    this._sendInsertCommand(insertedContent, selection.start, selection.end);
    this._selectEditor(selection.start + prefix.length, selection.start + insertedContent.length);
  }

  private _makeItalic() {
    this._wrap('*');
  }

  private _strike() {
    this._wrap('~~');
  }

  private _tab() {
    this._insert('\t');
  }

  private _addTable() {
    const table = `\n
| h | h |
| -- | -- |
| d | d |
\n<br />\n`;
    this._insert(table);
  }

  private _underline() {
    this._wrap('<u>', '</u>');
  }

  private _getEditorSelection(): { start: number, end: number, selected: boolean } {
    const editor = this._editorRef.nativeElement;
    return {
      start: editor.selectionStart,
      end: editor.selectionEnd,
      selected: editor.selectionStart != editor.selectionEnd
    };
  }

  private _selectEditor(start: number | undefined = undefined, end: number | undefined = undefined) {
    const editor = this._editorRef.nativeElement;
    setTimeout(() => {
      editor.select();
      if (start) editor.selectionStart = start;
      if (end) editor.selectionEnd = end;
    });
  }

  private _wrap(wrapStart: string, wrapEnd?: string, placeholder: string = 'text') {
    if (!wrapEnd) wrapEnd = wrapStart;
    const selection = this._getEditorSelection();
    if (selection.selected) {
      const selectedContent = this.content.slice(selection.start, selection.end);
      if (selectedContent.startsWith(wrapStart) && selectedContent.endsWith(wrapEnd)) {
        this._sendInsertCommand(
          selectedContent.slice(
            wrapStart.length, selectedContent.length - wrapEnd.length), selection.start, selection.end);
        this._selectEditor(selection.start, selection.end - wrapStart.length - wrapEnd.length);
      } else {
        this._sendInsertCommand(wrapStart + selectedContent.trim() + wrapEnd, selection.start, selection.end);
        this._selectEditor(selection.start, selection.end + wrapStart.length + wrapEnd.length);
      }
    } else {
      this._sendInsertCommand(`${wrapStart}${placeholder}${wrapEnd}`, selection.start);
      this._selectEditor(selection.start + wrapStart.length, selection.start + wrapStart.length + placeholder.length);
    }
  }

  private _insert(insertedContent: string) {
    const selection = this._getEditorSelection();
    this._sendInsertCommand(insertedContent, selection.start, selection.end);
    const newPosition = selection.start + insertedContent.length;
    this._selectEditor(newPosition, newPosition);
  }

  private _sendInsertCommand(insertContent: string, left: number, right?: number) {
    this._editorRef.nativeElement.focus();
    if (!right) right = left;
    document.execCommand('insertText', false, insertContent);
    this._handleContentChanged(this.content);
  }
}
