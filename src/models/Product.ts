import { ProductCategory } from "./ProductCategory";
import { Store } from "./Store";
import { UOM } from "./UOM";
import { Media } from "./Media";

export class Product {
    constructor(
        public id: number = null,
        public name: string = null,
        public description: string = null,
        public category: ProductCategory = null,
        public price: number = null,
        public store: Store = null,
        public uom: UOM = null,
        public media_list?: Media[],
        public addedToCart?:number,
    ) {}
}

export interface ProductFilter {
    page: number;
    product_category_id?: number;
    store_id?: number;
}
