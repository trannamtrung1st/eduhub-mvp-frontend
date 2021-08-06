import { isPlatformServer } from "@angular/common";
import { Directive, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { makeStateKey, StateKey, TransferState } from "@angular/platform-browser";

@Directive()
export abstract class StateTransferableComponent<StateType> implements OnInit {

    protected abstract transferStateKeyName: string;
    protected transferStateKey?: StateKey<StateType>;
    protected isPlatformServer: boolean;
    protected needInitData: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: object,
        protected transferState: TransferState
    ) {
        this.isPlatformServer = isPlatformServer(platformId);
        this.needInitData = true;
    }

    ngOnInit(): void {
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

    initStateFlags() {
        this.transferStateKey = makeStateKey<StateType>(this.transferStateKeyName);
        this.needInitData = !this.transferState.hasKey(this.transferStateKey)
            || this.isPlatformServer;
    }

    patchTransferredState(defaultValue: StateType) {
        const transferredState = this.getTransferredState(defaultValue);
        Object.assign(this, transferredState);
        this.removeTransferredState();
    }

    removeTransferredState() {
        if (!this.transferStateKey)
            throw new Error("Transfer state key has not been initialized yet");
        this.transferState.remove(this.transferStateKey);
    }
}