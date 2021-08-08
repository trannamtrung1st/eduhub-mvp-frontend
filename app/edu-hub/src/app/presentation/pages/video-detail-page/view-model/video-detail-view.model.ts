import { VideoDetailModel } from "@core/video/models/video-detail.model";

export class VideoDetailViewModel implements VideoDetailModel {
    thumbnailUrl?: string | undefined;

    constructor(public streamUrl: string = '',
        public id: string = '',
        public title: string = '',
        public author: string = '',
        public subjectId: number = 0,
        public description: string = '') {
    }
}