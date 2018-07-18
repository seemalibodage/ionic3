import {
    Component,
    OnChanges,
    SimpleChanges,
    DoCheck,
    ViewChild,
    ElementRef,
    Inject
} from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/debounce";

import { CONFIG } from '../../app/config';

import { ProductService } from "../../services/product.service";
import { StoreService } from "../../services/store.service";

import { ProductListingPage } from "../product/product-list";
import { ProductPage } from "../product/product";
// import { StorePage } from "../store/store";

import { Product } from "../../models/Product";
import { ProductCategory } from "../../models/ProductCategory";
import { Store } from "../../models/Store";
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: "page-search",
    templateUrl: "search.html"
})
export class SearchPage implements OnChanges, DoCheck {
    public noImageURL: string;
    public currencySymbol: string;
    public products: Array<Product>;
    public productCategories: Array<ProductCategory>;
    public stores: Array<Store>;
    public errorMessage: string;
    public searchType: string = "store";
    public oldSearchType: string = "store";
    public searchProducts: Subject<string> = new Subject<string>();
    public listLoading: boolean = false;
    public searchLoading: boolean = false;
    @ViewChild("ipt") input: ElementRef;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
        public storeService: StoreService,
        @Inject(CONFIG) private config: any
    ) {
        this.currencySymbol = config.CURRENCY_SYMBOL;
        this.noImageURL = config.NO_IMAGE_URL;
        this.searchProducts.asObservable().debounceTime(500).subscribe(event => {
            if (!event) {
                return;
            }
            this.searchLoading = true;
            productService.searchProducts(event).subscribe(products => {
                this.products = products;
                this.searchLoading = false;
            }, error => (this.errorMessage = <any>error));
        });
    }

    ionViewDidLoad() {
        this.getStores();
        console.log("ionViewDidLoad SearchPage");
    }

    changeSearchSubject(value) {
        this.searchProducts.next(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (propName === "searchProducts") {
                this.searchType === "store"
                    ? this.getStores()
                    : this.getProductCategories();
            }
        }
    }
    ngDoCheck() {
        if (this.oldSearchType !== this.searchType) {
            this.oldSearchType = this.searchType;
            this.searchType === "store"
                ? this.getStores()
                : this.getProductCategories();
        }
    }
    getProductCategories() {
        if (this.productCategories) {
            return;
        }
        this.listLoading = true;
        this.productService.getProductCategories().subscribe(productCategories => {
            this.productCategories = productCategories;
            this.listLoading = false;
        }, error => (this.errorMessage = <any>error));
    }
    getStores() {
        if (this.stores) {
            return;
        }
        this.listLoading = true;
        this.storeService.getStores().subscribe(productCategories => {
            this.stores = productCategories;
            this.listLoading = false;
        }, error => (this.errorMessage = <any>error));
    }
    goToProductList(
        searchType: string,
        searchTerm: Store | ProductCategory
    ) {
        let search = {};
        search[searchType] = searchTerm;
        this.navCtrl.push(ProductListingPage, search);
    }
    goToProductPage(product: Product) {
        this.navCtrl.push(ProductPage, product);
    }
}
