export class VideoViewModel {
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