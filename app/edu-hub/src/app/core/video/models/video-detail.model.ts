import { VideoModel } from "./video.model";

export interface VideoDetailModel extends VideoModel {
    streamUrl: string;
}