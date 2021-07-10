import { Routes } from '@angular/router';
import { TripService } from './../../../Services/trip-service/trip.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { TouristicObjectiveModel } from 'src/app/Models/touristic-objective-model/touristic-objective-model.model';
import { TouristicObjectiveServiceService } from 'src/app/Services/touristic-objective-service/touristic-objective-service.service';
import { makeBindingParser } from '@angular/compiler';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined

  center!: google.maps.LatLngLiteral;
  currentPosition!: google.maps.LatLng;
  startLocation?: google.maps.LatLng;
  data = "initialised";

  options: google.maps.MapOptions = {
    center: { lat: 45.64550, lng: 25.58719 },
    zoom: 7,
    maxZoom: 18,
    minZoom: 6
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markers: google.maps.Marker[] = [];
  positionMarkers: google.maps.LatLng[] = [];
  infoContent = '';
  markersTitle: google.maps.MarkerLabel[] = [];
  waypoints: google.maps.DirectionsWaypoint[] = [];
  maxDistance : number = 0;
  maxPosition!: google.maps.LatLng;
  routes: google.maps.DirectionsRoute[] = [];
  selectedMode!: google.maps.TravelMode;

  selectedObjectives: TouristicObjectiveModel[] = [];
  objective!: TouristicObjectiveModel;
  objectivesList: TouristicObjectiveModel[] = [];
  orderedList: TouristicObjectiveModel[] = [];

  apiLoaded: Observable<boolean>;
  isHidden = true;
  ishiddenList =true;

  constructor(private httpClient: HttpClient, private objectiveService: TouristicObjectiveServiceService, private tripService: TripService) {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCO-radFmBvWu8enR_JlVnyx89dMb_LBTA&libraries=geometry', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  orderSelectedObjectives() {
    this.addMarker(this.selectedObjectives);
    this.selectedMode = google.maps.TravelMode.DRIVING;
    this.loadData();
    this.ishiddenList = false;
  }

  addMarker(objectives: TouristicObjectiveModel[]) {
    this.currentPosition = new google.maps.LatLng(this.center.lat, this.center.lng);
    objectives.forEach((selectedObjective: TouristicObjectiveModel) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(selectedObjective.latitude, selectedObjective.longitude),
        label: {
          color: '#1889A7',
          text: selectedObjective.name,
        },
        title: selectedObjective.name,
        icon: {
          url: '/Routilogix/img/breakStart.png',
          fillColor: '#DBB620',
          fillOpacity: 1,
          scale: .025,
          anchor: new google.maps.Point(200, 500)
        }
      });
      const markerLat = marker.getPosition()?.lat();
      const markerLng = marker.getPosition()?.lng();
      let markerPosition = new google.maps.LatLng(markerLat!, markerLng!);

      if (this.calculateDistance(this.currentPosition!, markerPosition!) > this.maxDistance) {
        this.maxDistance = this.calculateDistance(this.currentPosition!, markerPosition!);
        this.maxPosition = markerPosition;
      }

      this.positionMarkers.push(markerPosition);
      this.markersTitle.push(marker.getLabel()!);
      this.markers.push(marker);
      this.waypoints.push({ location: markerPosition, stopover: true });
    });
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.currentPosition.lat(), this.currentPosition.lng()),
      label: {
        color: '#1889A7',
        text: 'current position',
      },
      title: 'current position',
      icon: {
        url: '/Routilogix/img/breakStart.png',
        fillColor: '#DBB620',
        fillOpacity: 1,
        scale: .025,
        anchor: new google.maps.Point(200, 500)
      }
    });
    this.markers.push(marker);
    this.positionMarkers.push(this.currentPosition)
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info!.open(marker);
  }

  ngOnInit(): void {
    this.refreshObjectivesList();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    })
  }

  refreshObjectivesList() {
    this.objectiveService.getTouristicObjectivesList().subscribe(data => {
      this.objectivesList = data;
    });
  }

  tripForm() {
    this.isHidden = false;
  }

  calculateAndDisplayRoute(directionsService: google.maps.DirectionsService, directionsRenderer: google.maps.DirectionsRenderer) {
    directionsService
      .route({
        origin: this.currentPosition,
        destination: this.maxPosition,
        // destination: this.currentPosition,
        waypoints: this.waypoints,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,
        travelMode: this.selectedMode,
      }, (response, status) => {
        if (status === 'OK') {

          var polylineProps = {
            strokeColor: '#009933',
            strokeOpacity: 1.0,
            strokeWeight: 3
          };

          directionsRenderer = new google.maps.DirectionsRenderer({
            draggable: false,
            suppressMarkers: true,
            polylineOptions: polylineProps
          });
          directionsRenderer.setDirections(response);
          console.log("response", response);

          this.routes.push(response.routes[0]);
          console.log("route", this.routes[0].waypoint_order)
          this.orderedList = this.orderList(this.selectedObjectives, this.routes[0].waypoint_order);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
    });
  }

  calculateDistance(start: google.maps.LatLng, end: google.maps.LatLng): number {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(start, end);
    return distance;
  }

  orderList(list: TouristicObjectiveModel[], order: number[]): TouristicObjectiveModel[]{
    const orderedList : TouristicObjectiveModel[] = [];
    for(let i = 0; i < list.length; i++){
      orderedList[order[i]] = list[i];
    }

    return orderedList;
  }

  loadData(){
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap;
    this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  }

  drivingMode(){
    this.selectedMode = google.maps.TravelMode.DRIVING;
    this.loadData();
  }

  walkingMode(){
    this.selectedMode = google.maps.TravelMode.WALKING;
    this.loadData();
  }
}
