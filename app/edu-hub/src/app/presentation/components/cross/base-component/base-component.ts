import { Directive, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";

import { StateTransferableComponent } from "../state-transferable/state-transferable-component";

@Directive()
export abstract class BaseComponent<StateType> extends StateTransferableComponent<StateType> implements OnDestroy {
    protected subscriptions: Subscription[] = [];

    ngOnDestroy(): void {
        // Or instead use AsyncPipe in template
        this.subscriptions?.forEach(sub => sub.unsubscribe());
    }
}