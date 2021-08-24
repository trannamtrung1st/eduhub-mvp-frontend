import { BlogFilterSortBy } from "@core/blog/constants";
import { PAGINATION } from "@cross/pagination/constants";

export class FilterBlogQuery {
    static readonly type = '[EduHub] Filter Blogs';

    searchTerm?: string;

    constructor(public skip: number = 0,
        public take: number = PAGINATION.defaultPageSize,
        public subjects: number[] = [],
        public sortBy: BlogFilterSortBy = BlogFilterSortBy.Rating,
        public isDesc: boolean = true) {
    }
}