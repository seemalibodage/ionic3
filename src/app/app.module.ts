import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { File } from '@ionic-native/file';
import { AuthService } from '../services/auth.service';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from "@angular/http";
import { APP_CONFIG, CONFIG } from './config';
import { ProductListingPage } from '../pages/product/product-list';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { StoreService } from '../services/store.service';
import { CartPage } from '../pages/order/cart';
import { SearchPage } from '../pages/search/search';
import { ProductPage } from '../pages/product/product';
import { LocationPageModule } from '../pages/location/location.module';

@NgModule({
	declarations: [
		MyApp,
		LoginPage,
		ProductListingPage,
		CartPage,
		SearchPage,
		ProductPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpModule,
		LocationPageModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		LoginPage,
		ProductListingPage,
		CartPage,
		SearchPage,
		ProductPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		File,
		AuthService,
		ProductService,
		CartService,
		// OrderService,
		StoreService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		{ provide: CONFIG, useValue: APP_CONFIG },
	]
})
export class AppModule { }
