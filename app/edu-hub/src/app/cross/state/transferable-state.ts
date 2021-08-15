import { isPlatformServer } from "@angular/common";
import { Directive, Inject, PLATFORM_ID } from "@angular/core";
import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";

import { NgxsOnInit, StateContext } from "@ngxs/store";

@Directive()
export abstract class TransferableState<StateType> implements NgxsOnInit {

    protected abstract transferStateKeyName: string;
    protected transferStateKey?: StateKey<StateType>;
    protected isPlatformServer: boolean;
    protected shouldLoad: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        protected transferState: TransferState
    ) {
        this.isPlatformServer = isPlatformServer(platformId);
        this.shouldLoad = true;
    }

    ngxsOnInit(ctx?: StateContext<any>) {
        this.initStateFlags();
    }

    getTransferredState(defaultValue: StateType): StateType {
        return this.transferStateKey
            ? this.transferState.get(this.transferStateKey, defaultValue)
            : defaultValue;
    }

    setTransferredState(state: StateType): void {
        if (!this.transferStateKey)
            throw new Error("Transfer state key has not been initialized yet");
        this.transferState.set(this.transferStateKey, state);
    }

    updateTransferredState(patcher: (state: StateType) => void, defaultValue: StateType): void {
        if (!this.transferStateKey)
            throw new Error("Transfer state key has not been initialized yet");
        const currentState = this.transferState.get(this.transferStateKey, defaultValue);
        patcher(currentState);
    }

    initStateFlags() {
        this.transferStateKey = makeStateKey<StateType>(this.transferStateKeyName);
        this.shouldLoad = !this.transferState.hasKey(this.transferStateKey)
            || this.isPlatformServer;
    }

    patchTransferredState(dest: StateType, defaultValue?: StateType) {
        const transferredState = this.getTransferredState(defaultValue || dest);
        Object.assign(dest, transferredState);
        this.removeTransferredState();
    }

    removeTransferredState() {
        if (!this.transferStateKey)
            throw new Error("Transfer state key has not been initialized yet");
        this.transferState.remove(this.transferStateKey);
        this.shouldLoad = true;
    }
}