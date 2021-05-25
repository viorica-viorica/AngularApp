import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options: google.maps.MapOptions = {
    center: {lat: 45.64550, lng: 25.58719},
    zoom: 12
  };

  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCO-radFmBvWu8enR_JlVnyx89dMb_LBTA', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
   }

  ngOnInit(): void {
  }

}
