import {
    Component,
    OnInit,
    AfterViewInit,
    DoCheck,
    ViewChild,
    Inject
} from "@angular/core";
import {
    LoadingController,
    Loading,
    AlertController,
    NavController,
    NavParams,
    ModalController,
    InfiniteScroll,
} from "ionic-angular";

import { CONFIG } from '../../app/config';
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";

import { Product, ProductFilter } from "../../models/Product";
import { ProductCategory } from "../../models/ProductCategory";
import { Pager } from "../../models/Pager";

import { CartPage } from "../order/cart";
import { SearchPage } from "../search/search";
import { ProductPage } from "./product";

@Component({
    selector: "page-product-listing",
    templateUrl: "./product-listing.html"
})
export class ProductListingPage implements OnInit, AfterViewInit, DoCheck {
    public title: string = "Foods";
    public productCategories: ProductCategory[];
    public products: Pager<Product>;
    public noImageURL: string;
    public currencySymbol: string;
    public filter: ProductFilter = { page: 1 };
    public errorMessage: string;
    public showProductLoader: boolean = false;

    public totalCartProducts: number;

    @ViewChild(InfiniteScroll) productInfiniteScroll: InfiniteScroll;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private productService: ProductService,
        private cartService: CartService,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController,
        @Inject(CONFIG) config: any
    ) {
        this.currencySymbol = config.CURRENCY_SYMBOL;
        this.noImageURL = config.NO_IMAGE_URL;
    }

    ngAfterViewInit() { }

    ngOnInit() {
        let filter = this.navParams.data;
        this.getProductCategories();
        this.filterProducts(filter);
        this.totalCartProducts = this.cartService.totalProducts();
    }
    ionViewDidEnter() {
        this.updateCartCount();
    }
    updateCartCount() {

        if (this.products && this.products.data && this.products.data.length) {
            this.products.data.map((product: Product) => {
                product.addedToCart = this.cartService.noOfQtyInCart(product);
            });
        }
    }
    resetProductsFilter() {
        this.filter = { page: 1 };
        this.getProducts();
    }
    filterProducts(filter) {
        if (filter && filter.productCategory) {
            this.filter.product_category_id = filter.productCategory.id;
            this.title = filter.productCategory.name;
        }
        if (filter && filter.store) {
            this.filter.store_id = filter.store.id;
            this.title = filter.store.name;
        }
        this.filter.page = 1;
        this.productInfiniteScroll.enable(true);
        this.getProducts();
    }

    ngDoCheck() {
        if (this.cartService.totalProducts() !== this.totalCartProducts) {
            this.totalCartProducts = this.cartService.totalProducts();
        }
    }

    getProducts() {
        let loading: Loading = this.showLoading();
        loading.present();
        this.productService.getProducts(this.filter).subscribe(
            products =>
                setTimeout(() => {
                    console.log(products);
                    if (products.last_page === products.current_page) {
                        this.productInfiniteScroll.enable(false);
                    }
                    loading.dismiss();
                    this.products = products;
                    this.updateCartCount();
                }, 0),
            error => {
                loading.dismiss();
                this.errorMessage = <any>error;
                this.showError("Unable to load Foods");
            }
        );
    }

    getProductCategories() {
        if (this.productCategories) {
            return;
        }
        this.productService.getProductCategories().subscribe(productCategories => {
            this.productCategories = productCategories;
        }, error => (this.errorMessage = <any>error));
    }

    loadMoreProducts(infiniteScroll) {
        this.filter.page++;
        this.productService
            .getProducts(this.filter)
            .subscribe(products =>
                setTimeout(() => {
                    console.log(products);
                    this.products.current_page = products.current_page;
                    this.products.from = products.from;
                    this.products.to = products.to;
                    this.products.data = this.products.data.concat(products.data);
                    infiniteScroll.complete();
                    if (products.last_page === products.current_page) {
                        infiniteScroll.enable(false);
                    }
                }, 0),
                error => {
                    infiniteScroll.complete();
                    this.errorMessage = <any>error;
                    this.showError("Unable to load Foods");
                }
            );
    }

    doRefreshProducts(refresher) {
        this.productInfiniteScroll.enable(true);
        this.filter = { page: 1 };
        this.productService.getProducts(this.filter).subscribe(
            products =>
                setTimeout(() => {
                    refresher.complete();
                    this.products = products;
                }, 0),
            error => {
                refresher.complete();
                this.errorMessage = <any>error;
                this.showError("Unable to load Foods");
            }
        );
    }

    openProductModal(product) {
        let productModal = this.modalCtrl.create(ProductPage, product);
        productModal.present();
    }

    updateCart(event: Event, product: Product, qty: number = 1) {
        event.stopPropagation();
        product.addedToCart = qty;
        this.cartService.update(product, qty);
        this.totalCartProducts = this.cartService.totalProducts();
    }

    showLoading(): Loading {
        let loading = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loading.present();
        return loading;
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: "Fail",
            subTitle: text,
            buttons: ["OK"]
        });
        alert.present();
    }
    trackByProductId(index: number, product: Product) {
        return product.id;
    }

    showSearchpage(item) {
        this.navCtrl.push(SearchPage);
    }

    showCartPage() {
        this.navCtrl.push(CartPage);
    }

    showProductPage(event: Event, product: Product) {
        event.stopPropagation();
        this.navCtrl.push(ProductPage, product);
    }
}
