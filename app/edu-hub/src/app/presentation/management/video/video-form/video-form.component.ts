import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { DEFAULT_STREAM_URL } from '@domains/video/constants';

import { FormHelper } from '@cross/form/form-helper';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent extends BaseComponent<VideoFormState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = VideoFormComponent.name;

  uploadFormGroup!: FormGroup;
  videoUrl?: string;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _nzMessageService: NzMessageService,
    private _formBuilder: FormBuilder
  ) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    if (this.isPlatformServer) return;

    this.uploadFormGroup = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmit(): void {
    const isValid = FormHelper.validateFormGroup(this.uploadFormGroup);
    if (!isValid) return;
  }

  handleUploadChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this._nzMessageService.success(`${file.name} file uploaded successfully.`);
      this.videoUrl = DEFAULT_STREAM_URL;
    } else if (status === 'error') {
      this._nzMessageService.error(`${file.name} file upload failed.`);
    }
  }
}

class VideoFormState {
}
