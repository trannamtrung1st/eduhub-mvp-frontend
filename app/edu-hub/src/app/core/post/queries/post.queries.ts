import { PAGINATION } from "@cross/pagination/constants";
import { PostFilterSortBy } from "../constants";

export namespace PostQueries {
    export class Filter {
        static readonly type = '[EduHub] Filter Posts';

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
}