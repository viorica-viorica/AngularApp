import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  items = [
    {
      img: '../../../../assets/Carousel/pensiunea-luiza.jpg',
      alt: 'Pensiune Luiza'
    },
    {
      img: '../../../../assets/Carousel/hotel-ambient.jpg',
      alt: 'Hotel Ambient'
    },
    {
      img: '../../../../assets/Carousel/hotel-drachenhaus.jpg',
      alt: 'Hotel Drachenaus'
    },
    {
      img: '../../../../assets/Carousel/kronwell.jpg',
      alt: 'Hotel Kronwell'
    },
    {
      img: '../../../../assets/Carousel/piscina.jpg',
      alt: 'Hotel cu piscina'
    },
    {
      img: '../../../../assets/Carousel/business-standard-room.jpg',
      alt: 'Bussines standard room'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
