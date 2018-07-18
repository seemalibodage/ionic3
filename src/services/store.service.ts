import { Injectable, Inject } from '@angular/core';
import {
    Http,
    Response,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Store } from '../models/Store';
import { AuthService } from './auth.service';
import { CONFIG } from '../app/config';
import { stores } from '../mock-data/product';

@Injectable()
export class StoreService {
    constructor() {
    }

    getStores(): Observable<Store[]> {
        return new Observable((observer) => {

            setTimeout(() => {
                observer.next(stores)

            }, 1000);
        });
    }
}