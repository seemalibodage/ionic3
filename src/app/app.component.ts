import { Component } from '@angular/core';
import { Platform, NavController, ToastController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { User } from '../models/User';
import { ProductListingPage } from '../pages/product/product-list';
import { SearchPage } from '../pages/search/search';
import { LocationPage } from '../pages/location/location';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	rootPage: any = LoginPage;
	public currentUser: User;

	pages: Array<{ title: string; component: any; icon: string }>;
	public totalCartProducts: number;
	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public auth: AuthService,
		public cart: CartService,
		public app:App,
		public toastCtrl: ToastController
	) {

		this.initializeApp();
		if (auth.authenticated) {
			this.totalCartProducts = this.cart.totalProducts();
			this.currentUser = auth.currentUser;
			this.rootPage = ProductListingPage;
		} else {
			this.rootPage = LoginPage;
		}
		this.pages = [
			{
				title: "Home",
				component: ProductListingPage,
				icon: "ios-home-outline"
			},
			{ title: "Search", component: SearchPage, icon: "ios-search-outline" },
			{
				title: "Restaurant",
				component: null,
				icon: "ios-restaurant-outline"
			},
			{
				title: "Your Orders",
				component: null,
				icon: "ios-browsers-outline"
			}
		];
		// this.checkLogin();
	}
	openPage(component) {
		if (component) {
			this.app.getRootNav().setRoot(ProductListingPage);
			// this.rootPage = component;
		}

	}
	changeLocation() {
			this.app.getRootNav().setRoot(LocationPage);
	}
	ngDoCheck() {
		if (this.cart.totalProducts() !== this.totalCartProducts) {
			this.totalCartProducts = this.cart.totalProducts();
		}
	}
	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			// let status bar overlay webview
			this.statusBar.overlaysWebView(false);

			// set status bar to white
			this.statusBar.backgroundColorByHexString('#bf2e42');

			this.splashScreen.hide();
			if (this.auth.authenticated) {			}
		});
	}
	logout() {
		// this.pushService.unregister();
		this.cart.removeAllItems();
		this.auth.logout();
		let toast = this.toastCtrl.create({
			message: "Sucessfully Logout",
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
		// this.rootPage = LoginPage;
		this.app.getRootNav().setRoot(LoginPage);
	}
}

