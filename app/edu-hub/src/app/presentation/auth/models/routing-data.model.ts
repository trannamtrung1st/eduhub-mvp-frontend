import { Type } from "@angular/core";

import { Policy } from "../policies/policy";

export interface RoutingData {
    loginPath?: string;
    accessDeniedPath?: string;
    policies?: Type<Policy>[];
}