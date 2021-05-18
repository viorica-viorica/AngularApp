import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //private map: google.maps.Map | undefined
  
  constructor() { }

  ngOnInit(): void {
    // let loader = new Loader({
    //   apiKey: 'AIzaSyCO-radFmBvWu8enR_JlVnyx89dMb_LBTA'
    // })

    // loader.load().then(() => {
    //   new google.maps.Map(document.getElementById("map") as HTMLElement,{
    //     center: { lat: 46.5, lng: 25.3},
    //     zoom: 6
    //   })
    // })

  }
}
