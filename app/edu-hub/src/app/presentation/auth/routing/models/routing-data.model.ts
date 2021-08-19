import { Type } from "@angular/core";

import { Policy } from "@presentation/auth/policies/policy";

export interface RoutingData {
    loginPath?: string;
    accessDeniedPath?: string;
    policies?: Type<Policy>[];
    breadcrumb?: string;
    title: string;
    subTitle: string;
}