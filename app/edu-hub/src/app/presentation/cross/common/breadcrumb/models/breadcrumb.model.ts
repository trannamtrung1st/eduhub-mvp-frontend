import { RoutingData } from "@presentation/cross/routing/models/routing-data.model";

export class BreadcrumbModel {
    display?: string;

    constructor(public routingData: RoutingData,
        public url: string,
        public active: boolean) {
        this.display = routingData.breadcrumb;
    }
}