import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  items=[
    {
      img: '../../../../assets/Objectives/9e2f6de991858d3851013b472ce0ddbb.jpg',
      alt: 'Cetatea Rupea',
      description: 'Cetatea Rupea'
    },
    {
      img: '../../../../assets/Objectives/castelul-bran.jpg',
      alt: 'Castelul Bran',
      description: 'Castelul Bran'
    },
    {
      img: '../../../../assets/Objectives/3757065.jpg',
      alt: 'Castelul Bran',
      description: 'Castelul Bran'
    },
    {
      img: '../../../../assets/Objectives/bran-castle-5.jpg',
      alt: 'Castelul Bran',
      description: 'Castelul Bran'
    },
    {
      img: '../../../../assets/Objectives/4716740.jpg',
      alt: 'Piața Sfatului',
      description: 'Piața Sfatului'
    },
    {
      img: '../../../../assets/Objectives/piata-sfatului.jpg',
      alt: 'Piața Sfatului',
      description: 'Piața Sfatului'
    },
    {
      img: '../../../../assets/Objectives/brasov-piata-sfatului-HD-upperhouse.ro_.jpg',
      alt: 'Piața Sfatului',
      description: 'Piața Sfatului'
    },
    {
      img: '../../../../assets/Objectives/poiana-brasov-1.jpg',
      alt: 'Poiana Brașov',
      description: 'Poiana Brașov'
    },
    {
      img: '../../../../assets/Objectives/poiana-brasov.jpg',
      alt: 'Poiana Brașov',
      description: 'Poiana Brașov'
    },
    {
      img: '../../../../assets/Objectives/Cetatea-Rasnov.jpg',
      alt: 'Cetatea Râșnov',
      description: 'Cetatea Râșnov'
    },
    {
      img: '../../../../assets/Objectives/Lacul-Noua.jpg',
      alt: 'Lacul Noua',
      description: 'Lacul Noua'
    },
    {
      img: '../../../../assets/Objectives/11458702Master.jpg',
      alt: 'Lacul Noua',
      description: 'Lacul Noua'
    } 
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
