import { Injectable, Inject } from '@angular/core';
import {
    Http,
    Response,
    URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Pager } from '../models/Pager';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { UOM } from '../models/UOM';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { CONFIG } from '../app/config';
import { products, productCategories } from '../mock-data/product';

@Injectable()
export class ProductService {
    constructor() {
    }

    searchProducts(searchTerm: string): Observable<Product[]> {
        return new Observable((observer) => {
            setTimeout(() => {

                let filteredProducts = products.data.filter((ele) => {
                    return ele.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                })
                observer.next(filteredProducts)

            }, 1000);
        });
    }

    getProducts(filter?: Object): Observable<Pager<Product>> {
        return new Observable((observer) => {

            setTimeout(() => {
                observer.next(products)

            }, 1000);
        });
    }
    getProductCategories(): Observable<ProductCategory[]> {
        return new Observable((observer) => {

            setTimeout(() => {
                observer.next(productCategories)
            }, 1000);
        });
    }
}