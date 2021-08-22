import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferState } from '@angular/platform-browser';

import { Store } from '@ngxs/store';

import { FormHelper } from '@cross/form/form-helper';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent extends BaseComponent<BlogFormState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = BlogFormComponent.name;

  blogFormGroup!: FormGroup;
  blogContentControl: FormControl;
  showBlogPreview: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _nzMessageService: NzMessageService,
    private _formBuilder: FormBuilder
  ) {
    super(platformId, transferState);
    this.blogContentControl = new FormControl('', [Validators.required]);
    this.showBlogPreview = false;
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;

    this.blogFormGroup = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      blogContent: this.blogContentControl,
    });

    this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmitted(): void {
    const isValid = FormHelper.validateFormGroup(this.blogFormGroup);
    if (!isValid) return;
  }

  onShowPreviewClicked() {
    this.showBlogPreview = true;
  }

  onBlogPreviewCanceled() {
    this.showBlogPreview = false;
  }
}

class BlogFormState {
}
