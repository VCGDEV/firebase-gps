import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {GoogleMapsModule} from "google-maps-angular2";

export const config:any = {
  apiKey: "AIzaSyDo--JtQxmFRFm32PMny3wP5z-Q8qIXm2g",
  authDomain: "gps-field-services.firebaseapp.com",
  databaseURL: "https://gps-field-services.firebaseio.com",
  projectId: "gps-field-services",
  storageBucket: "gps-field-services.appspot.com",
  messagingSenderId: "209685429597"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config,"gps-field-services"),
    AngularFireDatabaseModule,
    GoogleMapsModule.forRoot({
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQVcqyAcEuQrGITG_O8t5s_270UM3hmcc&callback=__onGoogleLoade'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
