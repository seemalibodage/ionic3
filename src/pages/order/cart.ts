import { Component, Inject } from "@angular/core";
import { NavController, NavParams, LoadingController, Loading, ToastController, ModalController } from "ionic-angular";

import { CONFIG} from '../../app/config';

import { ProductPage } from "../product/product";

import { CartService } from "../../services/cart.service";
import { ProductService } from "../../services/product.service";

import {Order } from '../../models/Order';
import {OrderDetails } from '../../models/OrderDetails';
import { Product } from "../../models/Product";

import { ProductListingPage } from "../product/product-list";

@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
    public noImageURL: string;
    public currencySymbol: string;
    public order: Order;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private cartService: CartService,
        private productService: ProductService,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        @Inject(CONFIG) private config: any
    ) {
        this.order = cartService.order;
        this.currencySymbol = config.CURRENCY_SYMBOL;
        this.noImageURL = config.NO_IMAGE_URL;
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad CartPage");
    }

    updateCart(product:OrderDetails, qty:number){
        this.cartService.update({
            id: product.product_id,
            name: product.product_name,
        } as Product, qty);
    }

    placeOrder(){
        let loading: Loading = this.showLoading();
        loading.present();
        setTimeout(() => {
            loading.dismiss();
            this.order = null;
            this.cartService.order = null;

            let toast = this.toastCtrl.create({
                message: "Order placed sucessfully",
                duration: 3000,
                position: "bottom"
            });
            toast.present();
            this.navCtrl.setRoot(ProductListingPage);
        }, 1000)
        
    }
    
    goBackToShopping(){
        if(this.navCtrl.canGoBack()){
            this.navCtrl.pop();
        } else {
            this.navCtrl.setRoot(ProductListingPage);
        }
    }
    removeAllItems(){
        this.cartService.removeAllItems();
        this.navCtrl.setRoot(ProductListingPage);
    }

    showLoading(): Loading {
        let loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        return loading;
    }
}
