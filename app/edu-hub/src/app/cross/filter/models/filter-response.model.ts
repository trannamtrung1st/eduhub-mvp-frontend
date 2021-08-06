export class FilterResponseModel<T> {

    constructor(public records: T[] = [],
        public totalRecords: number = 0) {
    }
}