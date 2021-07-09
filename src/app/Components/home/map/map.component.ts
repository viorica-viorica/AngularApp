import { Component, OnInit, OnDestroy } from '@angular/core';
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
    center: { lat: 45.64550, lng: 25.58719 },
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

  public lat = 45.64550;
  public lng = 25.58719
  public origin = { lat: 24.799448, lng: 120.979021 };
  public destination = { lat: 24.799524, lng: 120.975017 };
  public waypoints = [
    {
      location: { lat: 24.7950879, lng: 120.9784989 },
      stopover: false,
    },
    {
      location: { lat: 24.7941879, lng: 120.9785989 },
      stopover: false,
    }, {
      location: { lat: 24.7992879, lng: 120.9716989 },
      stopover: false,
    }
  ];

  public renderOptions = {
    suppressMarkers: true,
  };

  public markerOptions = {
    origin: {
      infoWindow: 'Origin.',
      icon: 'http://i.imgur.com/7teZKif.png',
    },
    waypoints: [
      {
        infoWindow: `<h4>A<h4>
        <a href='http://google.com' target='_blank'>A</a>
        `,
        icon: 'http://i.imgur.com/7teZKif.png',
      }, {
        infoWindow: `<h4>B<h4>
        <a href='http://google.com' target='_blank'>B</a>
        `,
        icon: 'http://i.imgur.com/7teZKif.png',
      },
      {
        infoWindow: `<h4>C<h4>
        <a href='http://google.com' target='_blank'>C</a>
        `,
        icon: 'http://i.imgur.com/7teZKif.png',
      }
    ],
    destination: {
      infoWindow: 'Destination',
      icon: 'http://i.imgur.com/7teZKif.png',
    },
  };

  // initMap(): void {
  //   const directionsService = new google.maps.DirectionsService();
  //   const directionsRenderer = new google.maps.DirectionsRenderer();
  //   const map = new google.maps.Map(
  //     document.getElementById("map") as HTMLElement,
  //     {
  //       zoom: 6,
  //       center: { lat: 41.85, lng: -87.65 },
  //     }
  //   );
  //   directionsRenderer.setMap(map);

  //   (document.getElementById("submit") as HTMLElement).addEventListener(
  //     "click",
  //     () => {
  //       this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  //     }
  //   );
  // }

  // calculateAndDisplayRoute(
  //   directionsService: google.maps.DirectionsService,
  //   directionsRenderer: google.maps.DirectionsRenderer
  // ) {
  //   const waypts: google.maps.DirectionsWaypoint[] = [];
  //   const checkboxArray = document.getElementById(
  //     "waypoints"
  //   ) as HTMLSelectElement;

  //   for (let i = 0; i < checkboxArray.length; i++) {
  //     if (checkboxArray.options[i].selected) {
  //       waypts.push({
  //         location: (checkboxArray[i] as HTMLOptionElement).value,
  //         stopover: true,
  //       });
  //     }
  //   }

  //   directionsService
  //     .route({
  //       origin: (document.getElementById("start") as HTMLInputElement).value,
  //       destination: (document.getElementById("end") as HTMLInputElement).value,
  //       waypoints: waypts,
  //       optimizeWaypoints: true,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     })
  //     .then((response) => {
  //       directionsRenderer.setDirections(response);
  //       const route = response.routes[0];
  //       const summaryPanel = document.getElementById(
  //         "directions-panel"
  //       ) as HTMLElement;
  //       summaryPanel.innerHTML = "";

  //       // For each route, display summary information.
  //       for (let i = 0; i < route.legs.length; i++) {
  //         const routeSegment = i + 1;
  //         summaryPanel.innerHTML +=
  //           "<b>Route Segment: " + routeSegment + "</b><br>";
  //         summaryPanel.innerHTML += route.legs[i].start_address + " to ";
  //         summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
  //         summaryPanel.innerHTML += route.legs[i].distance!.text + "<br><br>";
  //       }
  //     })
  //     .catch((e) => window.alert("Directions request failed due to " + status));
  // }
}
