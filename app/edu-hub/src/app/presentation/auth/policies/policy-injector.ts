import { Injector } from "@angular/core";

import { AnonymousOnlyPolicy } from "./anonymous-only.policy";

export const PolicyInjector = Injector.create({
    name: '[EduHub] Policy Injector',
    providers: [
        { provide: AnonymousOnlyPolicy }
    ]
});