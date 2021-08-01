export const UNSUPPORTED_WIDTH = 1024;

// Routing
interface AppRouting {
    home: string;
    login: string;
    registration: string;
}

export const ROUTING: AppRouting = {
    home: '',
    login: 'login',
    registration: 'registration'
};

let copyRoutes: any = {
    ...ROUTING
};
Object.keys(copyRoutes).forEach(key => {
    copyRoutes[key] = '/' + copyRoutes[key];
});
export const A_ROUTING: AppRouting = copyRoutes;