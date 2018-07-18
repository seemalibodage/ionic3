import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { AgmCoreModule, InfoWindowManager, MarkerManager } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNw5_W7FzDS9AGybemUD459LS-8vX10lc'
    }),
  ],
  providers: [Geolocation, GoogleMapsAPIWrapper, InfoWindowManager, MarkerManager]
})
export class LocationPageModule {}
