import { PAGINATION } from "@app/constants";
import { PostFilterSortBy } from "../constants";

export class PostFilterRequestModel {
    skip: number;
    take: number;
    searchTerm?: string;
    subjects: number[];
    sortBy: PostFilterSortBy;
    isDesc: boolean;

    constructor() {
        this.skip = 0;
        this.take = PAGINATION.defaultPageSize;
        this.subjects = [];
        this.sortBy = PostFilterSortBy.Title;
        this.isDesc = true;
    }
}