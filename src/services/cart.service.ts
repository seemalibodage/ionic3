import {Platform} from 'ionic-angular';
import {Injectable, Inject} from '@angular/core';
import {
    Http,
    Response,
} from '@angular/http';

// import { Storage } from '@ionic/storage';

import {Observable } from 'rxjs/Observable';

import {Order } from '../models/Order';
import {OrderDetails } from '../models/OrderDetails';
import {Product } from '../models/Product';
import {AuthService } from './auth.service';
import {CONFIG} from '../app/config';

@Injectable()
export class CartService {
    public order: Order;
    constructor(
        public platform: Platform,
        private http: Http,
        private authService: AuthService,
        // private storage: Storage,
        @Inject(CONFIG) private config: any) {
            
        platform.ready().then(() => {
            // this.platform.pause.subscribe(() => {
            //     localStorage.setItem('CART_DATA', JSON.stringify(this.order));
            // });
            // localStorage.get('CART_DATA').then((val) => {
                this.order = JSON.parse(localStorage.getItem('CART_DATA')) as Order;
            // });
        });
    }

    totalProducts():number{
        return (this.order && this.order.order_details)? this.order.order_details.length : 0;
    }

    removeAllItems(){
        this.order = null;
    }
    
    noOfQtyInCart(product: Product):number{
        return (this.order && this.order.order_details)? 
            (():number => {
                let count = 0;
                this.order.order_details.forEach((p: OrderDetails, index : number) => {
                    count = p.product_id === product.id ? p.qty : null;
                })
                return count;
            })() : 0;
    }

    update(product: Product, qty: number){
        if(this.order){
            let existing_index:number;

            if(this.order.order_details.some((p: OrderDetails, index : number) => {
                existing_index = index;
                return p.product_id === product.id;
            })){
                if(qty){
                    this.order.order_details[existing_index].qty = qty;
                } else{
                    this.order.order_details.splice(existing_index, 1);
                }
            } else {
                this.order.order_details.push(new OrderDetails(
                    product.id,
                    product.name,
                    (product.media_list && product.media_list[0] )? product.media_list[0].path : null,
                    qty,
                    product.uom.id,
                    product.uom.name,
                    product.price
                ));
            }
            // return;
        } else {

            this.order = new Order(
                this.authService.currentUser,
                this.config.TAX,
                this.config.VAT,
                'PENDING',
                [new OrderDetails(
                        product.id,
                        product.name,
                        (product.media_list && product.media_list[0] )? product.media_list[0].path : null,
                        qty,
                        product.uom.id,
                        product.uom.name,
                        product.price
                )]
            );
        }
        product.addedToCart = qty;

        this.order.sub_total_price = 0;
        if(this.order.order_details && this.order.order_details.length){
            for(let i = 0; i < this.order.order_details.length ; i++){
                this.order.sub_total_price += +(this.order.order_details[i].qty * this.order.order_details[i].price).toFixed(2);
            }
            this.order.total_price = +(this.order.sub_total_price * ((100 + (this.config.VAT + this.config.TAX))/100)).toFixed(2);
        }
        localStorage.setItem('CART_DATA', JSON.stringify(this.order));
    }

    reOrderOf(order:Order){
        this.order = order;
    }
}