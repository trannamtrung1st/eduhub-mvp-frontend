import { cloneDeep } from "lodash";

export const UNSUPPORTED_WIDTH = 1024;

// Routing
const BASE_KEYWORD = 'base';
interface AppRouting {
    platform: {
        [BASE_KEYWORD]: '',
        home: string;
        login: string;
        registration: string;
        videoDetail: string;
        blogDetail: string;
    },
    management: {
        [BASE_KEYWORD]: string,
        profile: string
        medias: {
            [BASE_KEYWORD]: string,
            videoDetail: string,
            blogDetail: string
        }
    },
    [BASE_KEYWORD]: string,
    notFound: string;
    accessDenied: string;
}

export const ROUTING: AppRouting = {
    platform: {
        [BASE_KEYWORD]: '',
        home: '',
        login: 'login',
        registration: 'registration',
        videoDetail: 'video/:id',
        blogDetail: 'blog/:id'
    },
    management: {
        [BASE_KEYWORD]: 'management',
        profile: 'profile',
        medias: {
            base: 'medias',
            videoDetail: 'video/:id',
            blogDetail: 'blog/:id'
        }
    },
    [BASE_KEYWORD]: '',
    notFound: 'not-found',
    accessDenied: 'access-denied'
};

const absRoutes: any = cloneDeep(ROUTING);
function makeAbsolute(entry: any, parent: string) {
    const prefix = parent + (entry[BASE_KEYWORD] ? `/${entry[BASE_KEYWORD]}` : entry[BASE_KEYWORD]);
    Object.keys(entry).forEach(key => {
        if (key === BASE_KEYWORD) {
            entry[key] = prefix;
        } else if (typeof entry[key] === 'string') {
            entry[key] = `${prefix}/${entry[key]}`;
        } else {
            makeAbsolute(entry[key], prefix);
        }
    });
}
makeAbsolute(absRoutes, '');

export const A_ROUTING: AppRouting = absRoutes;