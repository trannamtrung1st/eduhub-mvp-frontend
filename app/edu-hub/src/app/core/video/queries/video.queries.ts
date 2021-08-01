import { PAGINATION } from "@cross/pagination/constants";
import { VideoFilterSortBy } from "../constants";

export namespace VideoQueries {
    export class Filter {
        static readonly type = '[EduHub] Filter Videos';

        skip: number;
        take: number;
        searchTerm?: string;
        subjects: number[];
        sortBy: VideoFilterSortBy;
        isDesc: boolean;

        constructor() {
            this.skip = 0;
            this.take = PAGINATION.defaultPageSize;
            this.subjects = [];
            this.sortBy = VideoFilterSortBy.Title;
            this.isDesc = true;
        }
    }
}