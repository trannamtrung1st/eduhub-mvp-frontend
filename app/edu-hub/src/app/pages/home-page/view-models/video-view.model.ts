import { MockVideo } from "@app/domains/video/models/mock-video.model";

export class VideoViewModel implements MockVideo {
    title: string;
    author: string;
    thumbnailUrl: string;
    subjectId: number;

    constructor() {
        this.title = "";
        this.thumbnailUrl = "";
        this.author = "";
        this.subjectId = 0;
    }
}