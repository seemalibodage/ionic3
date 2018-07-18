import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Store } from '../../models/Store';
import { StoreService } from '../../services/store.service';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public stores: Array<Store>;
  CURRENT_LOCATION: { latitude: number, longitude: number };
  markers: marker[];
  infoWindowContent: string;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,

    public storeService: StoreService,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad LocationPage');

    console.log('ionViewDidLoad LocationPage');
    this.platform.ready().then(() => {

      this.loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loading.present();
      this.geolocation.getCurrentPosition({ timeout: 15000, enableHighAccuracy: true }).then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        if (resp && resp.coords) {
        this.CURRENT_LOCATION = {
          latitude: resp.coords.latitude, longitude: resp.coords.longitude
        };
        localStorage.setItem("CURRENT_LOCATION", JSON.stringify(this.CURRENT_LOCATION));
      }
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      // let watch = this.geolocation.watchPosition();
      // watch.subscribe((data) => {
      //   if (data && data.coords) {
      //     this.CURRENT_LOCATION = {
      //       latitude: data.coords.latitude, longitude: data.coords.longitude
      //     };
      //     localStorage.setItem("CURRENT_LOCATION", JSON.stringify(this.CURRENT_LOCATION));
      //   }
      // });
      this.getStores();

    });
  }

  getStores() {
    if (this.stores) {
      return;
    }
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;

      this.markers = this.stores.map((e) => {
        return Object.assign(e.coords, { label: e.name, draggable: false, store_image: e.imagePath });
      });
      setTimeout(() => {

        this.loading.dismiss();
      }, 1000);
    }, error => { });
  }
  clickedMarker(label: string, index: number) {
    this.infoWindowContent = label;
    console.log(`clicked the marker: ${label || index}`)
  }

}
interface marker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
  store_image: string
}