import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {GoogleMapsService} from "google-maps-angular2";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'app';

  @ViewChild('mapElement') mapElement: ElementRef;
  @ViewChild('inputElement') inputElement: ElementRef;
  private map:any;
  private lastMarker:any;
  private points:FirebaseListObservable<any>;
  constructor(private gapi:GoogleMapsService,private  database:AngularFireDatabase){
    this.points = this.database.list("/locations");
  }


  ngAfterViewInit(){
    /**
     * Init map api [google.maps]
     */
    this.gapi.init.then(maps => {
      const loc = new maps.LatLng(20.6737919, -103.3354132);

      this.map = new maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: loc,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: maps.ZoomControlStyle.LARGE,
          position: maps.ControlPosition.RIGHT_BOTTOM
        }
      });

      /**
       * Test gps
       * */
      this.points.subscribe(
        next=>{
          var flightPlanCoordinates:any = [];
          let loc:any = new maps.LatLng(20.6737919, -103.3354132);
          next.forEach(position=>{
            flightPlanCoordinates.push({lat:position.lat,lng:position.lng})
            loc = new maps.LatLng(position.lat, position.lng);
          });

          if(!isNullOrUndefined(this.lastMarker))
            this.lastMarker.setMap(null);

          this.lastMarker = new maps.Marker(
            {
              map: this.map,
              position: loc,
              zoom: 18,
              draggable:false
            }
          );

          var flightPath = new maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#34a4ff',
            strokeOpacity: 1.0,
            strokeWeight: 4
          });

          flightPath.setMap(this.map);
          this.map.setZoom(18);
          this.map.setCenter(loc);

        }
      );
    });


  }
}
