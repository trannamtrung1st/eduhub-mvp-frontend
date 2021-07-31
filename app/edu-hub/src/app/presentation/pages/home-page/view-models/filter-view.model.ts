import { SortByViewModel } from "./sort-by.model";

export class FilterViewModel {
    subjects: number[];
    searchTerm?: string;
    sortByModel: SortByViewModel;
    isDesc: boolean;

    constructor() {
        this.subjects = [];
        this.searchTerm = "";
        this.sortByModel = {} as SortByViewModel;
        this.isDesc = false;
    }
}