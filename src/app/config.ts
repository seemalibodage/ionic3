import {InjectionToken} from '@angular/core';
export let CONFIG = new InjectionToken<any>('app.config');

interface CONFIG{
    PRODUCTION: boolean,
    API_BASE_URL: string,
    GOOGLE_API_KEY: string,
    TAX: number,
    VAT: number,
    CURRENCY_SYMBOL: string,
    NO_IMAGE_URL: string,
    API_URLS: Object
}

export const APP_CONFIG: CONFIG = {
    PRODUCTION: false,
    CURRENCY_SYMBOL: "&#8377",
    NO_IMAGE_URL: "assets/images/no-image.png",
    API_BASE_URL: "",
    GOOGLE_API_KEY: "AIzaSyDjXptJ4Lj777bK6iO1pf2GOvry_gpIPis",
    TAX: 12,
    VAT: 4,
    API_URLS: {
    }
};
