import { Component } from "@angular/core";
import {
  NavController,
  AlertController,
  LoadingController,
  Loading,
  MenuController
  //   IonicPage
} from "ionic-angular";
import { AuthService } from "../../services/auth.service";
// import { PushService } from "../../services/push.service";
import { ProductListingPage } from "../../pages/product/product-list";
// import { FacebookAuth, User } from "@ionic/cloud-angular";
// import {Facebook} from 'ionic-native';

import { User } from "../../models/User";


// @IonicPage()
@Component({
    selector: "page-login",
    templateUrl: "login.html"
})
export class LoginPage {
    loading: Loading;
    registerCredentials = { phone_no: "", password: ""};
    user_info:any;
    error_info:any;

    constructor(
        private nav: NavController,
        private auth: AuthService,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
    ) {
    }

    public createAccount() {
        this.nav.push("RegisterPage");
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(false);
    }
    ionViewWillLeave() {
        this.menuCtrl.enable(true);
    }
    public login() {
        this.showLoading();
        this.auth.login(this.registerCredentials.phone_no, this.registerCredentials.password).subscribe(
        (user: User) => {
            if (user) {
                this.nav.setRoot(ProductListingPage);
            } else {
                this.showError("Access Denied");
            }
        },
        error => {
            this.showError(error);
        }
        );
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: "Fail",
            subTitle: text,
            buttons: ["OK"]
        });
        alert.present();
    }
}
