export class FilterResponseModel<T> {
    records: T[];
    totalRecords: number;

    constructor() {
        this.records = [];
        this.totalRecords = 0;
    }
}