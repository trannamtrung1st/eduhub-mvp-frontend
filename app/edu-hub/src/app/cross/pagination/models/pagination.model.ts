import { PAGINATION } from "../constants";

export class PaginationModel {

    constructor(public current: number = 1,
        public totalRecords: number = 0,
        public pageSize: number = PAGINATION.defaultPageSize) {
    }

    get skip(): number {
        return (this.current - 1) * this.pageSize;
    }
}