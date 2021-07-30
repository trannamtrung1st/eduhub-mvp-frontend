import { PAGINATION } from "@app/constants";

export class PaginationModel {
    current: number;
    totalRecords: number;
    pageSize: number;

    constructor() {
        this.current = 1;
        this.totalRecords = 0;
        this.pageSize = PAGINATION.defaultPageSize;
    }

    get skip(): number {
        return (this.current - 1) * this.pageSize;
    }
}