import { PAGINATION } from "@cross/pagination/constants";
import { VideoFilterSortBy } from "../constants";

export namespace VideoQueries {
    export class Filter {
        static readonly type = '[EduHub] Filter Videos';

        searchTerm?: string;

        constructor(public skip: number = 0,
            public take: number = PAGINATION.defaultPageSize,
            public subjects: number[] = [],
            public sortBy: VideoFilterSortBy = VideoFilterSortBy.Rating,
            public isDesc: boolean = true) {
        }
    }

    export class GetDetail {
        static readonly type = '[EduHub] Get Video Detail';

        constructor(public id: string) {
        }
    }

    export class GetRecommended {
        static readonly type = '[EduHub] Get Recommended Videos';

        constructor(public relatedToVideoId: string) {
        }
    }

    export class GetRandomList {
        static readonly type = '[EduHub] Get Random Videos';
    }
}