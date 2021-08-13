import { PAGINATION } from "@cross/pagination/constants";
import { BlogFilterSortBy } from "../constants";

export namespace BlogQueries {
    export class Filter {
        static readonly type = '[EduHub] Filter Blogs';

        searchTerm?: string;

        constructor(public skip: number = 0,
            public take: number = PAGINATION.defaultPageSize,
            public subjects: number[] = [],
            public sortBy: BlogFilterSortBy = BlogFilterSortBy.Rating,
            public isDesc: boolean = true) {
        }
    }

    export class GetRecommended {
        static readonly type = '[EduHub] Get Recommended Blogs';

        constructor(public relatedToBlogId: string) {
        }
    }
}