import { VideoFilterSortBy } from "@core/video/constants";
import { PAGINATION } from "@cross/pagination/constants";

export class FilterVideoQuery {
    static readonly type = '[EduHub] Filter Videos';

    searchTerm?: string;

    constructor(public skip: number = 0,
        public take: number = PAGINATION.defaultPageSize,
        public subjects: number[] = [],
        public sortBy: VideoFilterSortBy = VideoFilterSortBy.Rating,
        public isDesc: boolean = true) {
    }
}