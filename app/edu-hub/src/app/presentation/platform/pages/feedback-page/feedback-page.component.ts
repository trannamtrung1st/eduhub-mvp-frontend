import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';

import { A_ROUTING } from '@app/constants';

import { FormHelper } from '@cross/form/form-helper';

import { LoaderCommands } from '@core/global/commands/loader.commands';

import { BaseComponent } from '@presentation/cross/components/base-component/base-component';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent extends BaseComponent<FeedbackState> implements OnInit, OnDestroy {

  protected transferStateKeyName: string = FeedbackPageComponent.name;

  A_ROUTING = A_ROUTING;

  feedbackFormGroup!: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    transferState: TransferState,
    private _store: Store,
    private _nzMessageService: NzMessageService,
    private _formBuilder: FormBuilder) {
    super(platformId, transferState);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const isBrowser = !this.isPlatformServer;

    if (this.shouldLoad) {
      this.isPlatformServer && this.setTransferredState(new FeedbackState());
    } else {
      this.patchTransferredState(this);
    }

    this.feedbackFormGroup = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.required]],
      feedback: ['', [Validators.required, Validators.minLength(25)]]
    });

    isBrowser && this._store.dispatch(new LoaderCommands.Hide());
  }

  onFormSubmit(): void {
    const isValid = FormHelper.validateFormGroup(this.feedbackFormGroup);
    if (!isValid) return;

    this._nzMessageService.success('[TODO] Feedback successfully');
  }
}

class FeedbackState {
}