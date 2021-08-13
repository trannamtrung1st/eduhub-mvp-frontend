export interface BlogViewModel {
    id: string;
    title: string;
    subjectId: number;
    createdTime: Date;
    commentCount: number;
    description: string;
    thumbnailUrl?: string;
    detailUrl?: string;
}