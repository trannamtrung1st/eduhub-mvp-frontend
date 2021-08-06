export class VideoViewModel {
    thumbnailUrl?: string;

    constructor(public id: string,
        public title: string,
        public author: string,
        public subjectId: number) {
    }
}