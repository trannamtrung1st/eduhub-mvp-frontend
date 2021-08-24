import * as VideoQueries from "../../queries/video.queries";

export class VideoDetailEvent {
    constructor(
        public success?: VideoQueries.GetDetailSuccess,
        public notFound?: VideoQueries.GetDetailNotFound
    ) {
    }
}
