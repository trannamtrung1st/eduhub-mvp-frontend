import { PAGINATION } from "@cross/pagination/constants";
import { PostFilterSortBy } from "../constants";

export namespace PostQueries {
    export class Filter {
        static readonly type = '[EduHub] Filter Posts';

        searchTerm?: string;

        constructor(public skip: number = 0,
            public take: number = PAGINATION.defaultPageSize,
            public subjects: number[] = [],
            public sortBy: PostFilterSortBy = PostFilterSortBy.Rating,
            public isDesc: boolean = true) {
        }
    }
}