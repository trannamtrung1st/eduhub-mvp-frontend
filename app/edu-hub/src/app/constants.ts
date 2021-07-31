// Routing
interface AppRouting {
    home: string;
    login: string;
}

export const ROUTING: AppRouting = {
    home: '',
    login: 'login'
};

let copyRoutes: any = {
    ...ROUTING
};
Object.keys(copyRoutes).forEach(key => {
    copyRoutes[key] = '/' + copyRoutes[key];
});
export const A_ROUTING: AppRouting = copyRoutes;