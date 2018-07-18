import { Component, ViewChild, Inject } from "@angular/core";
import { NavController, NavParams, ViewController, Slides, Content } from "ionic-angular";

// import { SocialSharing } from '@ionic-native/social-sharing';

import { CONFIG} from '../../app/config';

import { Pager } from "../../models/Pager";
import { Product, ProductFilter } from "../../models/Product";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";

/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-product",
  templateUrl: "product.html"
})
export class ProductPage {
    private product:Product;
    public noImageURL: string;
    public currencySymbol: string;

    public similarCatProducts: Pager<Product>;
    public similarStoreProducts: Pager<Product>;

    public similarCatProductsLoader: boolean;
    public similarStoreProductsLoader: boolean;

    @ViewChild(Content) content: Content;

    @ViewChild('similarCatProductSlide') similarCatProductSlide: Slides;
    @ViewChild('similarStoreProductSlide') similarStoreProductSlide: Slides;
    
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private productService: ProductService,
        private cartService: CartService,
        @Inject(CONFIG) config: any
    ) {
        this.product = <Product>navParams.data;
        this.currencySymbol = config.CURRENCY_SYMBOL;
        this.noImageURL = config.NO_IMAGE_URL;
    }

    ionViewDidLoad() {
        console.log("ionViewDidLoad ProductPage");
        this.similarCatProductSlide.ionSlideReachEnd.subscribe((event)=>{
            console.log("ionSlideNextEnd");
            this.getSimilarProducts({
                page: this.similarCatProducts ? this.similarCatProducts.current_page + 1 : 1,
                product_category_id: this.product.category.id
            })
        });
        this.similarStoreProductSlide.ionSlideReachEnd.subscribe((event)=>{
            console.log("ionSlideNextEnd");
            this.getSimilarProducts({
                page: this.similarStoreProducts ? this.similarStoreProducts.current_page + 1 : 1,
                store_id: this.product.store.id
            })
        });
    }
    
    getSimilarProducts(filter:ProductFilter) {
        let sliderName, dataListName, loaderName;
        if(filter.product_category_id){
            sliderName = 'similarCatProductSlide';
            dataListName = 'similarCatProducts';
            loaderName = 'similarCatProductsLoader';
        }
        if(filter.store_id){
            sliderName = 'similarStoreProductSlide';
            dataListName = 'similarStoreProducts';
            loaderName = 'similarStoreProductsLoader';
        }
        if(!sliderName || !dataListName){
            return;
        }
        if(this[dataListName] && 
            this[dataListName].current_page && 
            this[dataListName].last_page === this[dataListName].current_page){
            
            return;
        }
        // filter.page = (this[dataListName] && this[dataListName].current_page)? this[dataListName].current_page + 1 : 1;
        this[loaderName] = true;
        this.productService
            .getProducts(filter)
            .subscribe( products =>
                setTimeout(() => {
                    this[loaderName] = false;
                    if(!products.data.length){
                        return;
                        // this[sliderName].ionSlideReachEnd.unsubscribe();
                    }
                    products.data = products.data.filter(element=> element.id !== this.product.id);

                    if(!this[dataListName]){
                        this[dataListName] = products;
                    } else {
                        this[dataListName].current_page = products.current_page;
                        this[dataListName].from = products.from;
                        this[dataListName].to = products.to;
                        this[dataListName].data = this[dataListName].data.concat(products.data);
                    }
                    this[sliderName].update();
                }, 0),
                error => {
                    this[loaderName] = false;
                    console.log(error);
                }
            );
    }

    changeProduct(product:Product){
        this.content.scrollToTop();
        this.product = product;
        this.similarCatProducts = null;
        this.similarStoreProducts = null;
            this.getSimilarProducts({
                page: 1,
                store_id: this.product.store.id
            });
            this.getSimilarProducts({
                page: 1,
                product_category_id: this.product.category.id
            });
    }

    updateCart(qty:number = 1){
        this.cartService.update(this.product, qty);
        this.product.addedToCart = qty;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
