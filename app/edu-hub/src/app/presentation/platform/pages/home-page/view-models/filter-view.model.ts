import { CONTENT_SORT_BY } from "../constants";

export class FilterViewModel {
    searchTerm?: string;

    constructor(public subjects: number[] = [],
        public sortByModel = CONTENT_SORT_BY.find(sortBy => sortBy.isDefault),
        public isDesc: boolean = false) {
    }
}